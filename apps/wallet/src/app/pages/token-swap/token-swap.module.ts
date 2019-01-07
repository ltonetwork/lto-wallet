import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { TokenSwapComponent } from './token-swap.component';
import { SwapDialogComponent } from './components/swap-dialog/swap-dialog.component';

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
  declarations: [TokenSwapComponent, SwapDialogComponent],
  entryComponents: [SwapDialogComponent]
})
export class TokenSwapModule {}
