import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeInputModalComponent } from './fee-input-modal.component';

describe('FeeInputModalComponent', () => {
  let component: FeeInputModalComponent;
  let fixture: ComponentFixture<FeeInputModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeInputModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
