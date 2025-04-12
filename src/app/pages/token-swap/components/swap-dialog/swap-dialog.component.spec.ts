import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecaptchaModule } from 'ng-recaptcha';
import { BridgeServiceMock, WalletServiceMock } from '../../../../core/mocks';
import { QRCodeComponent } from 'angularx-qrcode';
import { SharedModule } from '../../../../shared';
import { WAVES_ADDRESS_VALIDATOR } from '../../../../core';
import { ReactiveFormsModule } from '@angular/forms';

import { SwapDialogComponent } from './swap-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SwapDialogComponent', () => {
  let component: SwapDialogComponent;
  let fixture: ComponentFixture<SwapDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RecaptchaModule,
        QRCodeComponent,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [SwapDialogComponent],
      providers: [
        BridgeServiceMock.provider,
        WalletServiceMock.provider,
        {
          provide: WAVES_ADDRESS_VALIDATOR,
          useValue: () => null
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
