import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawModalComponent } from './withdraw-modal.component';

describe('WithdrawModalComponent', () => {
  let component: WithdrawModalComponent;
  let fixture: ComponentFixture<WithdrawModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
