import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupAccountModalComponent } from './backup-account-modal.component';

describe('BackupAccountModalComponent', () => {
  let component: BackupAccountModalComponent;
  let fixture: ComponentFixture<BackupAccountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
