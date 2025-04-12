import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MakeTransactionComponent } from './make-transaction.component';
import { MakeTransactionModal } from './make-transaction-modal';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MakeTransactionTransfersComponent } from './components/make-transaction-transfers/make-transaction-transfers.component';

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        MakeTransactionComponent,
        MakeTransactionTransfersComponent
    ],
    providers: [MakeTransactionModal]
})
export class MakeTransactionModalModule {}
