import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AnchorsComponent } from './anchors.component';
import { FileDropModule, AnchorDetailsModule } from './components';
import { RouterModule, Routes } from '@angular/router';
import { TransactionConfirmationDialogModule } from '@app/components/transaction-confirmation-dialog';
import { TransactionQrDialogModule } from '@app/components/transaction-qr-dialog';
import { ContentSectionComponent, LoadingSpinnerComponent, TransactionDetailsComponent } from '@app/shared/components';

const routes: Routes = [
  {
    path: '',
    component: AnchorsComponent,
  }
];

@NgModule({
  declarations: [AnchorsComponent],
  imports: [
    SharedModule,
    FileDropModule,
    AnchorDetailsModule,
    RouterModule.forChild(routes),
    TransactionConfirmationDialogModule,
    TransactionQrDialogModule,
    TransactionDetailsComponent,
    ContentSectionComponent,
    LoadingSpinnerComponent
  ]
})
export class AnchorsModule {}
