import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorsComponent } from './anchors.component';

describe('AnchorsComponent', () => {
  let component: AnchorsComponent;
  let fixture: ComponentFixture<AnchorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
