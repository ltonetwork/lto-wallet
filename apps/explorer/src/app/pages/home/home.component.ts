import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@legalthings-one/component-kit';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { Router } from '@angular/router';
import { Observable, combineLatest, of, timer } from 'rxjs';
import { take, delay, catchError, map, switchMapTo, share } from 'rxjs/operators';

@Component({
  selector: 'poe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lastBlocks$: Observable<any[]> = this._node.lastBlocks(20, true).pipe(
    delay(500) // Make delay to let animations ned smoothly
  );

  unconfirmedTransactions$!: Observable<any[]>;
  // lastBlocks$!: Observable<any>;

  constructor(
    private _node: LtoPublicNodeService,
    private _notification: NotificationService,
    private _router: Router
  ) {}

  ngOnInit() {
    const poller = timer(500, 4000).pipe(share());
    this.unconfirmedTransactions$ = poller.pipe(switchMapTo(this._node.unconfirmedTransactions()));

    this.lastBlocks$ = poller.pipe(switchMapTo(this._node.getLastBlocks()));
  }

  search(value: string) {
    combineLatest(
      this._node.block(value).pipe(
        map(block => (block.status === 'error' ? null : block)),
        catchError(() => of(null))
      ),
      this._node.transaction(value).pipe(catchError(() => of(null))),
      this._node.balanceOf(value).pipe(catchError(() => of(null)))
    )
      .pipe(take(1))
      .subscribe(([isBlock, isTransaction, isAddress]) => {
        if (isBlock) {
          this._router.navigate(['/', 'block', value]);
        } else if (isTransaction) {
          this._router.navigate(['/', 'transaction', value]);
        } else if (isAddress) {
          this._router.navigate(['/', 'address', value]);
        } else {
          this._notification.show('Invalid value');
        }
      });
  }
}
