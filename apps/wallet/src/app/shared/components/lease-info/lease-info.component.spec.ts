import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseInfoComponent } from './lease-info.component';

describe('LeaseInfoComponent', () => {
  let component: LeaseInfoComponent;
  let fixture: ComponentFixture<LeaseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
