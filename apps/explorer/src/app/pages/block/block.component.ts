import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { MatSnackBar } from '@angular/material';

import { Observable, combineLatest } from 'rxjs';
import { switchMap, shareReplay, map, retry, retryWhen, delay, catchError } from 'rxjs/operators';

@Component({
  selector: 'poe-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  blockHeight$: Observable<number>;
  block$: Observable<any>;

  constructor(
    _activatedRote: ActivatedRoute,
    publicNode: LtoPublicNodeService,
    snackbar: MatSnackBar,
    router: Router
  ) {
    this.blockHeight$ = _activatedRote.params.pipe(map(params => params['height']));

    this.block$ = combineLatest(publicNode.height(), this.blockHeight$).pipe(
      switchMap(([nodeHeight, blockHeight]) => {
        if (nodeHeight < blockHeight) {
          throw 'Block height cannot be lower than node height!';
        }

        return publicNode.block(blockHeight).pipe(
          map(block => {
            if (block.status === 'error') {
              throw block;
            }
            return block;
          }),
          retryWhen(errors => errors.pipe(delay(1000)))
        );
      }),
      catchError(err => {
        snackbar.open('Block load error', 'DISMISS', { duration: 3000 });
        router.navigate(['/']);
        throw err;
      }),
      shareReplay(1)
    );
  }

  ngOnInit() {}
}
