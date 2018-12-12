import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgePageComponent } from './bridge-page.component';

describe('BridgePageComponent', () => {
  let component: BridgePageComponent;
  let fixture: ComponentFixture<BridgePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BridgePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
