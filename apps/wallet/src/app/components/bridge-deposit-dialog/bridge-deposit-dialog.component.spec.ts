import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeDepositDialogComponent } from './bridge-deposit-dialog.component';

describe('BridgeDepositDialogComponent', () => {
  let component: BridgeDepositDialogComponent;
  let fixture: ComponentFixture<BridgeDepositDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BridgeDepositDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgeDepositDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
