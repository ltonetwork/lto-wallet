import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'lto-copyable-text',
  templateUrl: './copyable-text.component.html',
  styleUrls: ['./copyable-text.component.scss'],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, MatRippleModule, MatTooltipModule],
})
export class CopyableTextComponent implements OnInit {
  @Input() text = '';
  @Input() label = '';

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit() {}

  copy() {
    const input = document.createElement('input');
    input.style.position = 'absolute';
    input.style.bottom = '-1000px';
    document.body.appendChild(input);
    input.value = this.text;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    this.snackbar.open('Address is copied', 'Dismiss', { duration: 3000 });
  }
}
