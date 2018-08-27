import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyvalueListComponent } from './keyvalue-list.component';

describe('KeyvalueListComponent', () => {
  let component: KeyvalueListComponent;
  let fixture: ComponentFixture<KeyvalueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyvalueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyvalueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
