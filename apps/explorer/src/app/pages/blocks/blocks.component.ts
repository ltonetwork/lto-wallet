import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { take, delay } from 'rxjs/operators';

@Component({
  selector: 'poe-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BlocksComponent implements OnInit {
  loading = true;
  blocks: any[] = [];

  constructor(private _publicNode: LtoPublicNodeService) {}

  ngOnInit() {
    this._publicNode
      .lastBlocks()
      .pipe(
        take(1),
        delay(500) // Let animations end smoothly
      )
      .subscribe(blocks => {
        this.loading = false;
        this.blocks = blocks;
      });
  }

  loadMore() {
    const lastHeight = this.blocks[this.blocks.length - 1].height;
    this.loading = true;
    this._publicNode
      .headerSequence(lastHeight - 1, 20)
      .pipe(take(1))
      .subscribe(blocks => {
        this.blocks = this.blocks.concat(blocks);
        this.loading = false;
      });
  }
}
