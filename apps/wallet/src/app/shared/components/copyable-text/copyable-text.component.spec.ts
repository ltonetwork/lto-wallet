import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyableTextComponent } from './copyable-text.component';

describe('CopyableTextComponent', () => {
  let component: CopyableTextComponent;
  let fixture: ComponentFixture<CopyableTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyableTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
