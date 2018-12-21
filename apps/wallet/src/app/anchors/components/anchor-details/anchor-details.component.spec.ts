import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorDetailsComponent } from './anchor-details.component';

describe('AnchorDetailsComponent', () => {
  let component: AnchorDetailsComponent;
  let fixture: ComponentFixture<AnchorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
