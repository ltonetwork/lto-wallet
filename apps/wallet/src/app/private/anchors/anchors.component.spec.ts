import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule, MatIconModule } from '@angular/material';
import {
  IsYouPipeModule,
  AmountDividePipeModule,
  TransactionDetailsModule,
  TypeLabelPipeModule,
  ContentSectionModule
} from '../../shared';
import { MyWalletMock } from '../services/mocks';
import { MyWallet } from '../services';

import { AnchorsComponent } from './anchors.component';

fdescribe('AnchorsComponent', () => {
  let component: AnchorsComponent;
  let fixture: ComponentFixture<AnchorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatIconModule,
        IsYouPipeModule,
        AmountDividePipeModule,
        TransactionDetailsModule,
        TypeLabelPipeModule,
        ContentSectionModule
      ],
      declarations: [AnchorsComponent],
      providers: [
        {
          provide: MyWallet,
          useValue: new MyWalletMock()
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
