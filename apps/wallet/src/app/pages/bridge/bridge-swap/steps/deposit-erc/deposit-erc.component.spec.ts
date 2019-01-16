import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositErcComponent } from './deposit-erc.component';

describe('DepositErcComponent', () => {
  let component: DepositErcComponent;
  let fixture: ComponentFixture<DepositErcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositErcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositErcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
