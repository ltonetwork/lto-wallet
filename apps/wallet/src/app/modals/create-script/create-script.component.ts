import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ScriptsService, PredefinedScript } from '../../core';
import { Observable } from 'rxjs';

@Component({
  selector: 'lto-create-script',
  templateUrl: './create-script.component.html',
  styleUrls: ['./create-script.component.scss']
})
export class CreateScriptComponent {
  scriptTextCtrl: FormControl;
  predefinedScripts: PredefinedScript[];

  constructor(private _dialogRef: MatDialogRef<any>, private _scriptsService: ScriptsService) {
    this.predefinedScripts = _scriptsService.predefinedScripts;
    this.scriptTextCtrl = new FormControl(this.predefinedScripts[0].value);
  }

  createScript() {
    this._dialogRef.close(this.scriptTextCtrl.value);
  }
}
