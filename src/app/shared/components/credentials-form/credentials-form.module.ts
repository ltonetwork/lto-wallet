import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrendetialsFormComponent } from './credentials-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  declarations: [CrendetialsFormComponent],
  exports: [CrendetialsFormComponent],
})
export class CredentialsFormModule {}
