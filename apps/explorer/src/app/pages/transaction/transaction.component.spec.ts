import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  PageContentModule,
  KeyvalueListModule,
  AmountPipeModule,
  AMOUNT_DIVIDER
} from '@explorer/shared';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { LtoPublicNodeService } from '@legalthings-one/platform';

import { TransactionComponent } from './transaction.component';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let publicNodeMock: Partial<LtoPublicNodeService>;

  beforeEach(async(() => {
    publicNodeMock = {};

    TestBed.configureTestingModule({
      imports: [
        PageContentModule,
        KeyvalueListModule,
        MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        AmountPipeModule
      ],
      declarations: [TransactionComponent],
      providers: [
        {
          provide: AMOUNT_DIVIDER,
          useValue: 100000000
        },
        {
          provide: LtoPublicNodeService,
          useValue: publicNodeMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
