import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSectionComponent } from './content-section.component';

describe('ContentSectionComponent', () => {
  let component: ContentSectionComponent;
  let fixture: ComponentFixture<ContentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
