import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrendetialsFormComponent } from './credentials-form.component';

describe('CrendetialsFormComponent', () => {
  let component: CrendetialsFormComponent;
  let fixture: ComponentFixture<CrendetialsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrendetialsFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrendetialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
