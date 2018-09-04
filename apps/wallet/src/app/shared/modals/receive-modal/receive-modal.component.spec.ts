import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveModalComponent } from './receive-modal.component';

describe('ReceiveModalComponent', () => {
  let component: ReceiveModalComponent;
  let fixture: ComponentFixture<ReceiveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
