import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lto-brand',
    template: `
    <a routerLink="/"> <img src="assets/LTO-LOGO.png" alt="" /> <strong>LTO</strong> Wallet </a>
  `,
    styles: [
        `
      a {
        text-decoration: none;
        color: #fff;
        font-weight: 100;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: end;
      }

      a strong {
        font-weight: 500;
        margin-right: 8px;
      }

      a img {
        height: 33px;
      }
    `
    ],
    standalone: false
})
export class BrandComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
