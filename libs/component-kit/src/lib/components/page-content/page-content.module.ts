import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageContentComponent } from './page-content.component';
import { PageContentBody } from './page-content-body.component';
import { PageContentHeader } from './page-content-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PageContentComponent, PageContentBody, PageContentHeader],
  exports: [PageContentComponent, PageContentBody, PageContentHeader]
})
export class PageContentModule {}
