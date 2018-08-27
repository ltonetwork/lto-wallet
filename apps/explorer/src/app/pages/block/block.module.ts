import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { BlockComponent } from './block.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ':height',
        component: BlockComponent,
        data: {
          sectionName: 'Block details'
        }
      }
    ])
  ],
  declarations: [BlockComponent]
})
export class BlockModule {}
