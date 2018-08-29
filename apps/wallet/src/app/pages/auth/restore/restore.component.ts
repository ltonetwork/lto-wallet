import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountManagementService } from '@wallet/core';

@Component({
  selector: 'lto-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {
  restoreForm: FormGroup;

  constructor(private _accountManager: AccountManagementService, private _router: Router) {
    this.restoreForm = new FormGroup({
      seed: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  async restoreAccount() {
    const { seed, name, password } = this.restoreForm.value;
    const wallet = this._accountManager.generateWallet(seed);
    await this._accountManager.createAccount(name, password, wallet);
    this._router.navigate(['/']);
  }
}
