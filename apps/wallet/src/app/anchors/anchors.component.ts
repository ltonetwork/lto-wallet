import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WalletService, groupByDate, TransactionsGroup, EncoderService, LedgerService } from '../core';
import { FeeInputModal } from '../modals';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lto-anchors',
  templateUrl: './anchors.component.html',
  styleUrls: ['./anchors.component.scss'],
})
export class AnchorsComponent implements OnInit {
  ledger$: Observable<boolean>;
  groupedAcnhors$: Observable<TransactionsGroup[]>;

  selectedTransaction: any = null;

  get detailsOpened(): boolean {
    return !!this.selectedTransaction;
  }

  constructor(
    private wallet: WalletService,
    private feeInputModal: FeeInputModal,
    private snackbar: MatSnackBar,
    private encoder: EncoderService,
    private ledgerService: LedgerService,
  ) {
    this.ledger$ = this.ledgerService.connected$;
    this.groupedAcnhors$ = wallet.anchors$.pipe(
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
    const fee = await this.feeInputModal.show(fileDropevent.hex);
    if (fee) {
      try {
        await this.wallet.anchor({ fee, hash: fileDropevent.base58 });
        this.snackbar.open('Anchor created', 'Dismiss', {
          duration: 3000,
        });
      } catch (error) {
        this.snackbar.open('Anchor creation error', 'Dismiss', {
          duration: 3000,
        });
      }
    }
  }

  select(transaction: any) {
    this.selectedTransaction = transaction;
  }

  private base58ToHex(base58Hash: string): string {
    const decoded = this.encoder.base58Decode(base58Hash);
    return this.encoder.hexEncode(decoded);
  }
}
