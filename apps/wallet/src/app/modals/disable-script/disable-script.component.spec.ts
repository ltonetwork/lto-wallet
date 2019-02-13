import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableScriptComponent } from './disable-script.component';

describe('DisableScriptComponent', () => {
  let component: DisableScriptComponent;
  let fixture: ComponentFixture<DisableScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
