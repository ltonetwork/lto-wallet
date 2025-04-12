import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  WalletService,
  IBalance,
  formControlErrors,
  ADDRESS_VALIDATOR,
  FeeService, toPromise
} from '../../core';
import { DEFAULT_TRANSFER_FEE } from '../../tokens';
import { take, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionConfirmDialog } from '../../components/transaction-confirmation-dialog';

import * as communityNodes from '../../../communityNodes.json';
import { TransactionQrDialog } from '@app/components/transaction-qr-dialog';

export interface LeaseData {
  amount: number;
  recipient: string;
  fee: number;
}

interface LeaseFormData {
  recipient: string;
  amount: number;
  fee: number;
}
interface CommunityNode {
  address?: string;
  sharing?: string;
  name: string;
  website?: string;
  payoutSchedule?: string;
  tgContact?: string;
  comment?: string;
  hide?: boolean;
}


@Component({
  selector: 'lto-wallet-start-lease-modal',
  templateUrl: './start-lease-modal.component.html',
  styleUrls: ['./start-lease-modal.component.scss'],
})
export class StartLeaseModalComponent implements OnInit {
  leaseForm: UntypedFormGroup | null = null;
  balance$!: Observable<IBalance>;
  isNodeSelected = false;
  communityNodesLoaded: CommunityNode[] = [];
  communityNodesCustom: CommunityNode[] = [];
  displayedColumns: string[] = ['name', 'address'];
  displayedColumnsCustom: string[] = ['name'];
  get recipientErrors() {
    return formControlErrors(this.leaseForm, 'recipient');
  }

  constructor(
    private dialogRef: MatDialogRef<any, LeaseData|boolean>,
    private _wallet: WalletService,
    private confirmDialog: TransactionConfirmDialog,
    private qrDialog: TransactionQrDialog,
    @Inject(ADDRESS_VALIDATOR) private _addressValidator: ValidatorFn,
    @Inject(MAT_DIALOG_DATA) public balance: number,
    private _feeService: FeeService,
  ) {
    // Shuffling array
    this.communityNodesLoaded = communityNodes.nodes.sort(() => Math.random() - 0.5)
      .filter((o: CommunityNode) => (!o.hide));
    this.communityNodesCustom.unshift({
      'name': 'Custom',
      'address': '',
      'comment': 'Lease to an unlisted node by entering the node address',
      'payoutSchedule': ''
    });
    this.balance$ = this._wallet.balance$;
  }

  ngOnInit() {
  }

  selectNode(element: CommunityNode) {
    this.isNodeSelected = true;
    this._wallet.balance$
      .pipe(withLatestFrom(this._feeService.leaseFee$), take(1))
      .subscribe(([balance, leaseFee]) => {
        const maxAmount = balance.available / balance.amountDivider;
        const minAmount = 1 / balance.amountDivider;
        const fee = leaseFee / balance.amountDivider;

        const maxLeased = (balance.available / balance.amountDivider) > 1 ?
          (balance.available / balance.amountDivider) - 1 : 0;
        this.leaseForm = new UntypedFormGroup({
          recipient: new UntypedFormControl(element.address, [Validators.required, this._addressValidator]),
          amount: new UntypedFormControl(maxLeased, [
            Validators.required,
            Validators.min(minAmount),
            Validators.max(maxAmount),
          ]),
          fee: new UntypedFormControl({ value: fee, disabled: true }, [
            Validators.required,
            Validators.min(minAmount),
          ]),
        });
      });
  }

  async lease() {
    if (!this.leaseForm) {
      return;
    }

    const formData = this.leaseForm.getRawValue() as LeaseFormData;

    if (!await toPromise(this._wallet.canSign$)) {
      const tx = this._wallet.prepareLease(formData);
      const send = await this.qrDialog.show({
        tx: {...tx, sender: await toPromise(this._wallet.address$)},
        transactionData: this._describeTransaction(formData)
      });

      if (send) {
        this.dialogRef.close(true);
      }
      return;
    }

    const confirmed = await this.confirmDialog.show({
      title: 'Confirm lease',
      transactionData: this._describeTransaction(formData)
    });

    if (!confirmed) {
      return;
    }

    this.dialogRef.close(formData);
  }

  private _describeTransaction(formData: LeaseFormData) {
    return [
      {
        label: 'To',
        value: formData.recipient,
      },
      {
        label: 'Amount',
        value: formData.amount,
      },
      {
        label: 'Fee',
        value: formData.fee,
      },
    ];
  }
}
