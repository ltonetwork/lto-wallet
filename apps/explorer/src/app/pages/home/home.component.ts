import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@legalthings-one/component-kit';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { Router } from '@angular/router';
import { ISearchValue } from '../../shared/components';
import { Observable } from 'rxjs';
import { take, delay } from 'rxjs/operators';

@Component({
  selector: 'poe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lastBlocks$: Observable<any[]> = this._node.lastBlocks(20, true).pipe(
    delay(500) // Make delay to let animations ned smoothly
  );

  constructor(
    private _node: LtoPublicNodeService,
    private _notification: NotificationService,
    private _router: Router
  ) {}

  ngOnInit() {}

  search(value: ISearchValue) {
    if (!value) {
      this._notification.show('Invalid value');
    } else {
      this._router.navigate(['/', value.type, value.value]);
    }
  }
}
