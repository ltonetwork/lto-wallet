import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateScriptComponent } from './create-script.component';
import { CreateScriptModal } from './create-script-modal';

@NgModule({
  declarations: [CreateScriptComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  entryComponents: [CreateScriptComponent],
  providers: [CreateScriptModal]
})
export class CreateScriptModule {}
