import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  AbstractControl,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export interface IAccountCredentials {
  accountName: string;
  password: string;
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
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
})
export class CrendetialsFormComponent implements OnInit {
  form: FormGroup;

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
    this.form = new FormGroup(
      {
        accountName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmation: new FormControl('', [Validators.required]),
      },
      {
        validators: this.checkPasswords as any, // Some wierd TS error with 'undefined'
      }
    );
  }

  ngOnInit() {}

  private checkPasswords(group: FormGroup) {
    let passwordField = group.get('password') as AbstractControl;
    let confirmationField = group.get('confirmation') as AbstractControl;

    return passwordField.value === confirmationField.value ? null : { notMatch: true };
  }
}
