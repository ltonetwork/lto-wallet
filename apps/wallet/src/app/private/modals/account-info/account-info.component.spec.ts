import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountInfoComponent } from './account-info.component';
import { SharedModule } from '../../../shared';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';

describe('AccountInfoComponent', () => {
  let component: AccountInfoComponent;
  let fixture: ComponentFixture<AccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, MatDialogModule],
      declarations: [AccountInfoComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
