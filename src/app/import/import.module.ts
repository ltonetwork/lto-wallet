import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ImportComponent } from './import.component';

const routes: Routes = [
  {
    path: '',
    component: ImportComponent,
  }
];

@NgModule({
  declarations: [ImportComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTooltipModule]
})
export class ImportModule {}
