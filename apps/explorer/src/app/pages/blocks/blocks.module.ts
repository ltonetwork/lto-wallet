import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { BlocksComponent } from './blocks.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlocksComponent,
        data: {
          sectionName: 'Blocks list'
        }
      }
    ])
  ],
  declarations: [BlocksComponent]
})
export class BlocksModule {}
