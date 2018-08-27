import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WavesNodeService } from '@legalthings-one/waves';

import { Observable } from 'rxjs';
import { switchMap, shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'poe-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  height$: Observable<number>;
  block$: Observable<any>;

  constructor(_activatedRote: ActivatedRoute, _waves: WavesNodeService) {
    this.height$ = _activatedRote.params.pipe(map(params => params['height']));
    this.block$ = this.height$.pipe(
      switchMap(height => _waves.block$(height)),
      shareReplay(1)
    );
  }

  ngOnInit() {}
}
