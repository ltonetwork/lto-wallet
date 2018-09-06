import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorsPageComponent } from './anchors-page.component';

describe('AnchorsPageComponent', () => {
  let component: AnchorsPageComponent;
  let fixture: ComponentFixture<AnchorsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
