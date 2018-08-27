import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WavesNodeService } from '@legalthings-one/waves';
import { Observable, merge } from 'rxjs';
import { map, switchMap, shareReplay, mapTo } from 'rxjs/operators';

@Component({
  selector: 'poe-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  id$: Observable<string>;
  balance$: Observable<any>;
  transactions$: Observable<any[] | undefined>;

  constructor(waves: WavesNodeService, activatedRoute: ActivatedRoute) {
    this.id$ = activatedRoute.params.pipe(map(params => params['id']));

    this.balance$ = this.id$.pipe(
      switchMap(id => waves.balanceOf$(id)),
      shareReplay(1)
    );

    this.transactions$ = merge(
      this.id$.pipe(mapTo(void 0)), // Clean list when chnage ID
      this.id$.pipe(
        switchMap(id => waves.transactionsOf$(id, 100)),
        map(result => result[0]), // For a some reason result is array of one element
        shareReplay(1)
      )
    );
  }

  ngOnInit() {}
}
