import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaptchaModule } from 'ng-recaptcha';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '../../../../shared';
import { WAVES_ADDRESS_VALIDATOR } from '../../../../core';
import { ReactiveFormsModule } from '@angular/forms';

import { WalletServiceMock } from '../../../../core/spies';
import { createBridgeServiceSpy } from '@app/core/spies';

import { SwapDialogComponent } from './swap-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SwapDialogComponent', () => {
  let component: SwapDialogComponent;
  let fixture: ComponentFixture<SwapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RecaptchaModule,
        QRCodeModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [SwapDialogComponent],
      providers: [
        createBridgeServiceSpy(),
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
