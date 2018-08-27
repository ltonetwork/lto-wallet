import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [CommonModule, MatIconModule, FlexLayoutModule, FormsModule],
  declarations: [SearchBoxComponent],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
