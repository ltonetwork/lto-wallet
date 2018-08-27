import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableCardComponent } from './data-table-card.component';

describe('DataTableCardComponent', () => {
  let component: DataTableCardComponent;
  let fixture: ComponentFixture<DataTableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
