import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { WalletService, IBalance, FeeService, toPromise, TransactionTypes } from '@app/core';
import { take, withLatestFrom } from 'rxjs/operators';
import { TransactionConfirmationDialog } from '@app/components/transaction-confirmation-dialog';
import { TransactionQrDialog } from '@app/components/transaction-qr-dialog';
import { MakeTransactionService } from '@app/core/services/make-transaction.service';
import { base58Encode } from 'lto-ledger-js-unofficial-test/lib/utils';

interface FormValue {
  transfers: FormTransfersValue[];
  attachment: string;
  fee: number;
}

interface FormTransfersValue {
  recipient: string;
  amount: number;
}

@Component({
    selector: 'lto-wallet-make-transaction',
    templateUrl: './make-transaction.component.html',
    styleUrls: ['./make-transaction.component.scss'],
    standalone: false
})
export class MakeTransactionComponent implements OnInit {
  loading = false;

  sendForm: UntypedFormGroup | null = null;
  private _recipientsCountSubscription: Subscription;

  balance$!: Observable<IBalance>;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private wallet: WalletService,
    private snackbar: MatSnackBar,
    private transactionConfirmDialog: TransactionConfirmationDialog,
    private transactionQrDialog: TransactionQrDialog,
    private _feeService: FeeService,
    private _transactionService: MakeTransactionService
  ) {
    this._recipientsCountSubscription = this._transactionService.transfersCount$.subscribe(
      (transfers) => this.updateDialogSize(transfers)
    );
  }

  ngOnInit() {
    this.balance$ = this.wallet.balance$;

    this.balance$
      .pipe(
        withLatestFrom(this._feeService.transferFee$, this._feeService.massTransferFee$),
        take(1)
      )
      .subscribe(([balance, transferFee, massTransferFee]) => {
        this.sendForm = this._transactionService.initForm(balance, transferFee, massTransferFee);
      });
  }

  ngOnDestroy() {
    this._recipientsCountSubscription.unsubscribe();
  }

  async send() {
    if (!this.sendForm) {
      return;
    }
    const formValue = this.sendForm.getRawValue() as FormValue;

    if (!await toPromise(this.wallet.canSign$)) {
      const tx = formValue.transfers.length === 1
        ? this.wallet.prepareTransfer(this._transferData(formValue))
        : this.wallet.prepareMassTransfer(formValue);

      (tx as any).attachment = base58Encode(new TextEncoder().encode((tx as any).attachment));

      const send = await this.transactionQrDialog.show({
        tx: {...tx, sender: await toPromise(this.wallet.address$)},
        transactionData: this._describeTransfer(formValue),
      });

      if (send) {
        this.dialogRef.close();
      }
      return;
    }

    const confirmed = await this.transactionConfirmDialog.show({
      transactionData: this._describeTransfer(formValue)
    });

    if (!confirmed) {
      return;
    }

    this.loading = true;

    //try {
      if (formValue.transfers.length === 1) {
        // Send simple transaction
        await this.wallet.transfer(this._transferData(formValue));
      } else {
        // Send mass transaction
        await this.wallet.massTransfer(formValue);
      }
    /*} catch (error) {
      console.error(error);
      this.snackbar.open('Transaction error', 'DISMISS', { duration: 3000 });
    }*/

    this.loading = false;
    this.dialogRef.close();
  }

  private _transferData(formValue: FormValue) {
    return {
      ...formValue.transfers[0],
      fee: formValue.fee,
      attachment: formValue.attachment,
    };
  }
  private _describeTransfer(formValue: FormValue) {
    const transactionData = [];

    if (formValue.transfers.length === 1) {
      // Simple transaction information
      transactionData.push(
        {
          label: 'To',
          value: formValue.transfers[0].recipient,
        },
        {
          label: 'Amount',
          value: formValue.transfers[0].amount,
        }
      );
    } else {
      // Mass transaction information
      transactionData.push({
        label: 'Number of recipients',
        value: formValue.transfers.length,
      });
      formValue.transfers.forEach((transfer) => {
        transactionData.push({
          label: transfer.recipient,
          value: transfer.amount,
          detailOnly: true,
        });
      });
      transactionData.push({
        label: 'Total amount',
        value: this._transactionService.totalAmount,
      });
    }

    // Shared information
    transactionData.push(
      {
        label: 'Fee',
        value: formValue.fee,
      },
      {
        label: 'Attachment',
        value: formValue.attachment,
      }
    );

    return transactionData;
  }

  private updateDialogSize(transfers: number) {
    if (transfers === 1) this.dialogRef.updateSize('500px');
    else if (transfers === 2) this.dialogRef.updateSize('700px');
  }
}
