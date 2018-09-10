import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseDetailsModalComponent } from './lease-details-modal.component';

describe('LeaseDetailsModalComponent', () => {
  let component: LeaseDetailsModalComponent;
  let fixture: ComponentFixture<LeaseDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
