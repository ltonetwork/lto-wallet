import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupPhraseComponent } from './backup-phrase.component';

describe('BackupPhraseComponent', () => {
  let component: BackupPhraseComponent;
  let fixture: ComponentFixture<BackupPhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupPhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
