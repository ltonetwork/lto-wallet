import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatRippleModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTableModule,
  MatDialogModule,
  MatIconRegistry
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class MaterialModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'anchor',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/anchor.svg')
    );
  }
}
