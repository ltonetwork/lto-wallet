import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ImportComponent } from './import.component';

@NgModule({
  declarations: [ImportComponent],
  imports: [SharedModule, RouterModule.forChild([]), ReactiveFormsModule]
})
export class ImportModule {}
