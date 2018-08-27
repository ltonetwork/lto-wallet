import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'lto-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  randomAddres: string = 'adasd';

  constructor() {}

  ngOnInit() {}

  createAccount(formValue: { name: string; password: string }) {
    console.log('Create ', formValue);
  }
}
