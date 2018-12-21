import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeWithdrawDialogComponent } from './bridge-withdraw-dialog.component';

describe('BridgeWithdrawDialogComponent', () => {
  let component: BridgeWithdrawDialogComponent;
  let fixture: ComponentFixture<BridgeWithdrawDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BridgeWithdrawDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgeWithdrawDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
