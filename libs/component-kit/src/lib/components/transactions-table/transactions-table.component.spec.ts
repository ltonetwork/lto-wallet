import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AmountPipeModule, AMOUNT_DIVIDER, LinksOutletModule } from '../../pipes';
import { MatTableModule } from '@angular/material';

import { TransactionsTableComponent } from './transactions-table.component';

describe('TransactionTableComponent', () => {
  let component: TransactionsTableComponent;
  let fixture: ComponentFixture<TransactionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, RouterTestingModule, AmountPipeModule, LinksOutletModule],
      declarations: [TransactionsTableComponent],
      providers: [
        {
          provide: AMOUNT_DIVIDER,
          useValue: 100000000
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
