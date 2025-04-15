import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  AbstractControl, ReactiveFormsModule
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

export interface IAccountCredentials {
  accountName: string;
  password: string;
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (!form || !control) {
      return true;
    }

    return form.hasError('notMatch') && control.dirty;
  }
}

@Component({
  selector: 'lto-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
})
export class CrendetialsFormComponent implements OnInit {
  form: UntypedFormGroup;

  appearance = 'outline';

  get valid(): boolean {
    return this.form.valid;
  }

  get invalid(): boolean {
    return this.form.invalid;
  }

  get value(): IAccountCredentials {
    const { accountName, password } = this.form.value;
    return { accountName, password };
  }

  confirmationErrorMatcher = new CustomErrorStateMatcher();

  constructor() {
    this.form = new UntypedFormGroup(
      {
        accountName: new UntypedFormControl('', [Validators.required]),
        password: new UntypedFormControl('', [Validators.required]),
        confirmation: new UntypedFormControl('', [Validators.required]),
      },
      {
        validators: this.checkPasswords as any, // Some wierd TS error with 'undefined'
      }
    );
  }

  ngOnInit() {}

  private checkPasswords(group: UntypedFormGroup) {
    let passwordField = group.get('password') as AbstractControl;
    let confirmationField = group.get('confirmation') as AbstractControl;

    return passwordField.value === confirmationField.value ? null : { notMatch: true };
  }
}
