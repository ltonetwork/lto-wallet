import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSnackBarModule,
  MatListModule,
  MatRippleModule,
  MatSidenavModule,
  MatDividerModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatTooltipModule,
  MatStepperModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ContentSectionComponent } from './components/content-section/content-section.component';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { IsYouPipe } from './pipes/is-you.pipe';
import { TypeLabelPipe } from './pipes/type-label.pipe';
import { AmountDividePipe } from './pipes/amount-divide.pipe';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { LeaseInfoComponent } from './components/lease-info/lease-info.component';
import { BackupPhraseComponent } from './components/backup-phrase/backup-phrase.component';

@NgModule({
  declarations: [
    ContentSectionComponent,
    IsYouPipe,
    TypeLabelPipe,
    AmountDividePipe,
    TransactionDetailsComponent,
    LeaseInfoComponent,
    BackupPhraseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatRippleModule,
    MatSidenavModule,
    MatDividerModule,
    MatStepperModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    ContentSectionComponent,
    MatRippleModule,
    MatSidenavModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    IsYouPipe,
    TypeLabelPipe,
    AmountDividePipe,
    TransactionDetailsComponent,
    LeaseInfoComponent,
    MatTooltipModule,
    MatTableModule,
    MatStepperModule,
    BackupPhraseComponent
  ]
})
export class SharedModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('lto', sanitizer.bypassSecurityTrustResourceUrl('/assets/lto.svg'));
  }
}
