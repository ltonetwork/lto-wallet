import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeSwapComponent } from './bridge-swap.component';

describe('BridgeSwapComponent', () => {
  let component: BridgeSwapComponent;
  let fixture: ComponentFixture<BridgeSwapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BridgeSwapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgeSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
