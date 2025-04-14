import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lto-placeholder-page',
  template: `<div class="placeholder"><h2>{{ title }}</h2></div>`,
  standalone: true
})
export class PlaceholderPageComponent {
  @Input() title = 'Placeholder';

  constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.data['title'];
  }
}
