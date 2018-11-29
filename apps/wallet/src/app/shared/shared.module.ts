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
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { LeaseInfoComponent } from './components/lease-info/lease-info.component';
import { BackupPhraseComponent } from './components/backup-phrase/backup-phrase.component';

import { ContentSectionModule, TransactionDetailsModule } from './components';
import { AmountDividePipeModule, TypeLabelPipeModule, IsYouPipeModule } from './pipes';

@NgModule({
  declarations: [LeaseInfoComponent, BackupPhraseComponent],
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
    MatProgressSpinnerModule,
    AmountDividePipeModule,
    TypeLabelPipeModule,
    IsYouPipeModule
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
    MatRippleModule,
    MatSidenavModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    IsYouPipeModule,
    TypeLabelPipeModule,
    AmountDividePipeModule,
    LeaseInfoComponent,
    MatTooltipModule,
    MatTableModule,
    MatStepperModule,
    BackupPhraseComponent,
    ContentSectionModule,
    TransactionDetailsModule
  ]
})
export class SharedModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('lto', sanitizer.bypassSecurityTrustResourceUrl('/assets/lto.svg'));
  }
}
