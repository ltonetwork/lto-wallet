import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../core/services';
import { AuthServiceMock } from '../../core/services/mocks';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatSnackBarModule,
  MatCardModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentSectionModule } from '../../shared';
import { CredentialsFormModule } from '../components/credentials-form';
import { ImportComponent } from './import.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;

  let authMock: AuthService;

  beforeEach(async(() => {
    authMock = new AuthServiceMock();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatSnackBarModule,
        ContentSectionModule,
        MatCardModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        CredentialsFormModule
      ],
      declarations: [ImportComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
