import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { AccountManagementService } from '@wallet/core';

import { CreateComponent } from './create.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let accountManagerMock: Partial<AccountManagementService>;

  beforeEach(async(() => {
    accountManagerMock = {
      generateWallet: () => ({} as any)
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [CreateComponent],
      providers: [
        {
          provide: AccountManagementService,
          useValue: accountManagerMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
