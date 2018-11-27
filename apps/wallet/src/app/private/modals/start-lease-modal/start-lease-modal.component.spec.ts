import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLeaseModalComponent } from './start-lease-modal.component';

describe('StartLeaseModalComponent', () => {
  let component: StartLeaseModalComponent;
  let fixture: ComponentFixture<StartLeaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartLeaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLeaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
