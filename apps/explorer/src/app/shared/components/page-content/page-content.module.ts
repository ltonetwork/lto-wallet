import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContentComponent } from './page-content.component';
import { PageContentHeader } from './page-content-header.components';
import { PageContentBody } from './page-content-body.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PageContentComponent, PageContentHeader, PageContentBody],
  exports: [PageContentComponent, PageContentHeader, PageContentBody]
})
export class PageContentModule {}
