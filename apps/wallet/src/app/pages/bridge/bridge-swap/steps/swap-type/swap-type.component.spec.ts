import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapTypeComponent } from './swap-type.component';

describe('SwapTypeComponent', () => {
  let component: SwapTypeComponent;
  let fixture: ComponentFixture<SwapTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
