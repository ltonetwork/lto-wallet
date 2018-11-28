import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule, MatIconModule } from '@angular/material';

import { AnchorsComponent } from './anchors.component';

fdescribe('AnchorsComponent', () => {
  let component: AnchorsComponent;
  let fixture: ComponentFixture<AnchorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule, MatIconModule],
      declarations: [AnchorsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
