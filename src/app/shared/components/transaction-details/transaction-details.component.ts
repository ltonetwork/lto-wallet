import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EncoderService, TransactionTypes } from '../../../core';

interface AnchorData {
  base64: string;
  base58: string;
  hex: string;
}

@Component({
    selector: 'lto-transaction-details',
    templateUrl: './transaction-details.component.html',
    styleUrls: ['./transaction-details.component.scss'],
    standalone: false
})
export class TransactionDetailsComponent implements OnInit, OnChanges {
  @Input() transaction!: LTO.Transaction;
  @Output() close = new EventEmitter();

  get isMassTransaction(): boolean {
    return this.transaction && this.transaction.type === 11;
  }

  get isLeasing(): boolean {
    return (
      this.transaction.type === TransactionTypes.LEASING ||
      this.transaction.type === TransactionTypes.CANCEL_LEASING
    );
  }

  selectedAnchorTpe: 'hex' | 'base64' | 'base58' = 'hex';

  anchors: any[] = [];

  get amountInfoVisible(): boolean {
    // Do not show amount info for anchors
    return this.transaction.type !== 15;
  }

  constructor(private encoderService: EncoderService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.anchors = this.extractAnchors(this.transaction);
  }

  private extractAnchors(transaction?: any): AnchorData[] {
    let anchorsData: any[] = [];

    if (!transaction) {
      return [];
    }

    if (transaction.type === 12) {
      anchorsData = transaction.data.filter((item: any) => item.key === '⚓');
    } else if (transaction.type === 15) {
      anchorsData = transaction.anchors;
    }

    return anchorsData.map(anchorData => {
      if (typeof anchorData === 'string') {
        const base58 = anchorData;
        const anchorValue = this.encoderService.decode(base58, 'base58');
        const hex = this.encoderService.hexEncode(anchorValue);
        const base64 = this.encoderService.base64Encode(anchorValue);
        return { base64, hex, base58 };
      } else {
        const base64 = anchorData.value.slice(7); // Slice "base64:" part
        const anchorValue = this.encoderService.base64Decode(base64);
        const hex = this.encoderService.hexEncode(anchorValue);
        const base58 = this.encoderService.base58Encode(anchorValue);
        return { base64, hex, base58 };
      }
    });
  }

  _close() {
    this.close.next();
  }

  selectAnchorType(type: 'base64' | 'base58' | 'hex') {
    this.selectedAnchorTpe = type;
  }
}
