import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksOutletPipe } from './links-outlet.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [LinksOutletPipe],
  exports: [LinksOutletPipe]
})
export class LinksOutletModule {}
