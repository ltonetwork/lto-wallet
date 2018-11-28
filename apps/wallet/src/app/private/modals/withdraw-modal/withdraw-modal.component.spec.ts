import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { WithdrawModalComponent } from './withdraw-modal.component';
import { AMOUNT_DIVIDER } from '../../../tokens';
import { AmountDividePipe } from '../../../shared/pipes';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WithdrawModalComponent', () => {
  let component: WithdrawModalComponent;
  let fixture: ComponentFixture<WithdrawModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      declarations: [WithdrawModalComponent, AmountDividePipe],
      providers: [
        {
          provide: AMOUNT_DIVIDER,
          useValue: 1000000
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: 100
        },
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    }).compileComponents();
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
