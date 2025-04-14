import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WalletService, groupByDate, TransactionsGroup, EncoderService, toPromise } from '../core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionConfirmDialog } from '@app/components/transaction-confirmation-dialog';
import { TransactionQrDialog } from '@app/components/transaction-qr-dialog';
import { AMOUNT_DIVIDER, ANCHOR_FEE } from '@app/tokens';

@Component({
    selector: 'lto-anchors',
    templateUrl: './anchors.component.html',
    styleUrls: ['./anchors.component.scss'],
    standalone: false
})
export class AnchorsComponent implements OnInit {
  fee: number;
  groupedAnchors$: Observable<TransactionsGroup[]>;

  selectedTransaction: any = null;

  get detailsOpened(): boolean {
    return !!this.selectedTransaction;
  }

  constructor(
    private wallet: WalletService,
    private confirmDialog: TransactionConfirmDialog,
    private qrDialog: TransactionQrDialog,
    private snackbar: MatSnackBar,
    private encoder: EncoderService,
    @Inject(AMOUNT_DIVIDER) divider: number,
    @Inject(ANCHOR_FEE) defaultFee: number,
  ) {
    this.fee = defaultFee / divider;

    this.groupedAnchors$ = wallet.anchors$.pipe(
      map((anchors) => {
        const withHash = anchors.items.map((anchorTransaction) => {
          // We need to show HASH in table and this HASH should be HEX-HASH
          const hash =
            anchorTransaction.anchors.length === 1
              ? this.base58ToHex(anchorTransaction.anchors[0])
              : 'MULTIPLE';

          return {
            ...anchorTransaction,
            hash,
          };
        });

        const grouped = groupByDate(withHash);
        return grouped;
      }),
      shareReplay(1)
    );
  }

  ngOnInit() {}

  async createAnchor(fileDropevent: any) {
    const hash = fileDropevent.base58;

    if (!await toPromise(this.wallet.canSign$)) {
      const tx = this.wallet.prepareAnchor({ fee: this.fee, hash });
      await this.qrDialog.show({
        tx: {...tx, sender: await toPromise(this.wallet.address$)},
        transactionData: this._describeTransaction(hash)
      });

      return;
    }

    const confirmed = await this.confirmDialog.show({
      title: 'Confirm lease',
      transactionData: this._describeTransaction(hash)
    });

    if (!confirmed) {
      return;
    }

    try {
      await this.wallet.anchor({ fee: this.fee, hash });
      this.snackbar.open('Anchor created', 'Dismiss', {
        duration: 3000,
      });
    } catch (error) {
      this.snackbar.open('Anchor creation error', 'Dismiss', {
        duration: 3000,
      });
    }
  }

  private _describeTransaction(hash: string) {
    return [
      {
        label: 'Hash',
        value: hash,
      },
      {
        label: 'Fee',
        value: this.fee,
      },
    ];
  }

  select(transaction: any) {
    this.selectedTransaction = transaction;
  }

  private base58ToHex(base58Hash: string): string {
    const decoded = this.encoder.base58Decode(base58Hash);
    return this.encoder.hexEncode(decoded);
  }
}
