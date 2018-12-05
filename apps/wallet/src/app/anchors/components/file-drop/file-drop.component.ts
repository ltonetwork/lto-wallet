import { Component, OnInit } from '@angular/core';
import { UploadEvent, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'lto-wallet-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  dropped(event: UploadEvent) {
    const file = event.files[0].fileEntry as FileSystemFileEntry;
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
      console.log('Done:');
      console.log(reader.result);
    };
    reader.readAsBinaryString(file);
  }
}
