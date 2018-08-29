import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import {
  PageContentModule,
  AmountPipeModule,
  TransactionsSectionModule,
  AMOUNT_DIVIDER
} from '@legalthings-one/component-kit';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { AccountManagementService } from '@wallet/core';
import { WalletComponent } from './wallet.component';
import { of } from 'rxjs';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;
  let publicNodeMock: Partial<LtoPublicNodeService>;
  let accountManagerMock: Partial<AccountManagementService>;

  beforeEach(async(() => {
    publicNodeMock = {
      balanceOf: () => of({}),
      transactionsOf: () => of([])
    };
    accountManagerMock = {};

    TestBed.configureTestingModule({
      imports: [
        PageContentModule,
        AmountPipeModule,
        TransactionsSectionModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressSpinnerModule
      ],
      declarations: [WalletComponent],
      providers: [
        {
          provide: LtoPublicNodeService,
          useValue: publicNodeMock
        },
        {
          provide: AccountManagementService,
          useValue: accountManagerMock
        },
        {
          provide: AMOUNT_DIVIDER,
          useValue: 1000000
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
