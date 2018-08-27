import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsSectionComponent } from './transactions-section.component';

describe('TransactionsSectionComponent', () => {
  let component: TransactionsSectionComponent;
  let fixture: ComponentFixture<TransactionsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
