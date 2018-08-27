import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackbar: MatSnackBar) {}

  show(message: string, action: string = 'Dismiss') {
    this._snackbar.open(message, action, { duration: 3000 });
  }
}
