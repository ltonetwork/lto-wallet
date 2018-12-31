import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lto-brand',
  template: `
    <a routerLink="/"> <img src="assets/LTO-LOGO.png" alt="" /> <span>LTO Network</span> </a>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: #3d5170;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: end;

        img {
          height: 24px;
        }
      }
    `
  ]
})
export class BrandComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
