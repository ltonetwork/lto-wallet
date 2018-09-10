import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KeyvalueListComponent } from './keyvalue-list.component';
import { KeyvalueListItemComponent } from './keyvalue-list-item.components';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [KeyvalueListComponent, KeyvalueListItemComponent],
  exports: [KeyvalueListComponent, KeyvalueListItemComponent]
})
export class KeyvalueListModule {}
