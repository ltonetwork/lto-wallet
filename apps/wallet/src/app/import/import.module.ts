import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { ImportComponent } from './import.component';

@NgModule({
  declarations: [ImportComponent],
  imports: [SharedModule, RouterModule.forChild([])]
})
export class ImportModule {}
