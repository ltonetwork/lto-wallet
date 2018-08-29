import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'legalthings-one-explorer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sectionName$: Observable<string>;

  constructor(_router: Router, _route: ActivatedRoute) {
    this.sectionName$ = _router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      distinctUntilChanged(),
      switchMap(event => {
        let route = _route;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.data;
      }),
      map(routeData => {
        return routeData['sectionName'] || '';
      })
    );
  }
}
