import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KeyvalueListModule } from '@explorer/shared';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import {
  PageContentModule,
  TransactionsSectionModule,
  AMOUNT_DIVIDER,
} from '@legalthings-one/component-kit';

import { BlockComponent } from './block.component';
import { of } from 'rxjs';

describe('BlockComponent', () => {
  let component: BlockComponent;
  let fixture: ComponentFixture<BlockComponent>;
  let publicNodeMock: Partial<LtoPublicNodeService>;

  beforeEach(async(() => {
    publicNodeMock = {
      block: () => of({}),
      height: () => of(100),
      transaction: () => of({}),
      balanceOf: () => of({}),
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PageContentModule,
        TransactionsSectionModule,
        KeyvalueListModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
      ],
      declarations: [BlockComponent],
      providers: [
        {
          provide: LtoPublicNodeService,
          useValue: publicNodeMock,
        },
        {
          provide: AMOUNT_DIVIDER,
          useValue: 1000000000,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
