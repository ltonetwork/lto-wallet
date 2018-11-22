import { Component, OnInit } from '@angular/core';
import { MyWallet, ScreenService } from '../../core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lto-anchors',
  templateUrl: './anchors.component.html',
  styleUrls: ['./anchors.component.scss']
})
export class AnchorsComponent implements OnInit {
  get detailsOpened(): boolean {
    return !!this.selectedTransaction;
  }

  selectedTransaction: any = null;
  sidenavMode$: Observable<'side' | 'over'>;

  anchorTransactions$: Observable<any[]>;

  constructor(wallet: MyWallet, screen: ScreenService) {
    this.sidenavMode$ = screen.mode$.pipe(
      map(screenMode => (screenMode === 'mobile' ? 'over' : 'side'))
    );

    this.anchorTransactions$ = wallet.anchors$;
  }

  ngOnInit() {}

  select(transaction: any) {
    this.selectedTransaction = transaction;
  }
}
