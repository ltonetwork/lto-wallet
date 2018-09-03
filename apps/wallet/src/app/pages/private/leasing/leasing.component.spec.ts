import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingComponent } from './leasing.component';

describe('LeasingComponent', () => {
  let component: LeasingComponent;
  let fixture: ComponentFixture<LeasingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
