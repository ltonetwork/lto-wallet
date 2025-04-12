import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { sha256 } from 'js-sha256';
import { EncoderService } from '../../../core';

@Component({
    selector: 'lto-wallet-file-drop',
    templateUrl: './file-drop.component.html',
    styleUrls: ['./file-drop.component.scss'],
    standalone: false
})
export class FileDropComponent implements OnInit {
  @Output() fileHash = new EventEmitter<{
    hex: string;
    base58: string;
  }>();

  constructor(private encoder: EncoderService) {}

  ngOnInit() {}

  dropped(entries: NgxFileDropEntry[]) {
    const file = entries[0].fileEntry as FileSystemFileEntry;
    file.file((file: File) => {
      this.readFile(file);
    });
  }

  fileSelected(event: any) {
    const file = event.target.files[0];
    this.readFile(file);
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.generateHash(reader.result);
    };

    reader.readAsArrayBuffer(file);
  }

  private generateHash(buffer: any) {
    const hex = sha256(buffer);
    const shaBuffer = sha256.digest(buffer);

    this.fileHash.next({
      hex,
      base58: this.encoder.base58Encode(shaBuffer),
    });
  }
}
