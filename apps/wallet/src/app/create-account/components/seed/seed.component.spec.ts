import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedComponent } from './seed.component';

describe('create-account/SeedComponent', () => {
  let component: SeedComponent;
  let fixture: ComponentFixture<SeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow to copy text with space between words', () => {
    component.seed = ['foo', 'bar', 'zed'];
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toEqual('foo bar zed');
  });
});
