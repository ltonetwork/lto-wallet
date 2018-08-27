import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WavesNodeService } from '@legalthings-one/waves';
import { Observable } from 'rxjs';
import { switchMap, shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'poe-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  id$: Observable<string>;
  transaction$: Observable<any>;
  type$: Observable<4 | 8 | 9 | 12>; // Supported types

  constructor(_activatedRoute: ActivatedRoute, _waves: WavesNodeService) {
    this.id$ = _activatedRoute.params.pipe(map(params => params['id']));
    this.transaction$ = this.id$.pipe(
      switchMap(id => _waves.transaction$(id)),
      shareReplay(1)
    );

    this.type$ = this.transaction$.pipe(map(transaction => transaction.type));
  }

  ngOnInit() {}
}
