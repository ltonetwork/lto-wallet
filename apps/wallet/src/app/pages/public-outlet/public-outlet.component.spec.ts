import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOutletComponent } from './public-outlet.component';

describe('PublicOutletComponent', () => {
  let component: PublicOutletComponent;
  let fixture: ComponentFixture<PublicOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
