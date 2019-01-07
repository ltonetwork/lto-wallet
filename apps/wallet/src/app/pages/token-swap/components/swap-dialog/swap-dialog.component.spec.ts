import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaptchaModule } from 'ng-recaptcha';
import { BridgeServiceMock } from '../../../../core/mocks';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '../../../../shared';

import { SwapDialogComponent } from './swap-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SwapDialogComponent', () => {
  let component: SwapDialogComponent;
  let fixture: ComponentFixture<SwapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RecaptchaModule, QRCodeModule, NoopAnimationsModule],
      declarations: [SwapDialogComponent],
      providers: [BridgeServiceMock.provider]
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
