import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { TokenSwapComponent } from './token-swap.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TokenSwapComponent
      }
    ])
  ],
  declarations: [TokenSwapComponent]
})
export class TokenSwapModule {}
