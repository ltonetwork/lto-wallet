import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lto-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ContentSectionComponent implements OnInit {
  @Input() width!: 'full' | 'large' | 'medium' | 'small' | 'very-small';
  @Input() title = '';
  @Input() subtitle = '';

  get maxWidth(): string {
    switch (this.width) {
      case 'full':
        return '100%';
      case 'large':
        return '1400px';
      case 'medium':
        return '1024px';
      case 'small':
        return '800px';
      case 'very-small':
        return '600px';
      default:
        return '1024px';
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.maxWidth = this.maxWidth;
  }
}
