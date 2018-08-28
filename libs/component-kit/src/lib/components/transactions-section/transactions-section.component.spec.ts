import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionTableModule } from '../transactions-table';
import { DataTableCardModule } from '../data-table-card';
import { TransactionsSectionComponent } from './transactions-section.component';

describe('TransactionsSectionComponent', () => {
  let component: TransactionsSectionComponent;
  let fixture: ComponentFixture<TransactionsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TransactionTableModule, DataTableCardModule],
      declarations: [TransactionsSectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsSectionComponent);
    component = fixture.componentInstance;
    component.transactions = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
