import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentKitComponent } from './component-kit.component';

describe('ComponentKitComponent', () => {
  let component: ComponentKitComponent;
  let fixture: ComponentFixture<ComponentKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
