import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services';

@Component({
  selector: 'lto-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {
  authenticated$: Observable<boolean>;

  constructor(private auth: AuthService) {
    this.authenticated$ = auth.authenticated$;
  }

  ngOnInit() {}
}
