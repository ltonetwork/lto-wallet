import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWalletInfoModalComponent } from './my-wallet-info-modal.component';

describe('MyWalletInfoModalComponent', () => {
  let component: MyWalletInfoModalComponent;
  let fixture: ComponentFixture<MyWalletInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWalletInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWalletInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
