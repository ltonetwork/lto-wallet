import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface IAccountCredentials {
  accountName: string;
  password: string;
}

@Component({
  selector: 'lto-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss']
})
export class CrendetialsFormComponent implements OnInit {
  form: FormGroup;

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

  constructor() {
    this.form = new FormGroup({
      accountName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmation: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}
}
