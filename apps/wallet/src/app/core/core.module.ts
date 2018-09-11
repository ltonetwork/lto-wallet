import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class CoreModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('lto', sanitizer.bypassSecurityTrustResourceUrl('/assets/lto.svg'));
  }
}
