import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'lto-backup-phrase',
  templateUrl: './backup-phrase.component.html',
  styleUrls: ['./backup-phrase.component.scss']
})
export class BackupPhraseComponent implements OnInit, OnChanges {
  @ViewChild('stepper') stepper!: MatStepper;

  @Input() phrase!: string;
  @Output() confirmed = new EventEmitter();
  @Output() later = new EventEmitter();

  words: string[] = [];

  shuffledWords: string[] = [];
  selectedWords: string[] = [];

  get invalid(): boolean {
    return this.phrase !== this.selectedWords.join(' ');
  }

  get finished(): boolean {
    return this.selectedWords.length === this.words.length;
  }

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.words = this.phrase.split(' ');
  }

  toConfirmationStep() {
    this.resetConfirmation();
    this.stepper.next();
  }

  resetConfirmation() {
    this.shuffledWords = this.phrase.split(' ').sort(() => (Math.random() * 100 > 50 ? -1 : 1));
    this.selectedWords = [];
  }

  selectWord(word: string) {
    this.selectedWords.push(word);
  }

  isSelected(word: string): boolean {
    return this.selectedWords.indexOf(word) !== -1;
  }

  _confirmed() {
    this.confirmed.next();
  }

  _later() {
    this.later.next();
  }
}
