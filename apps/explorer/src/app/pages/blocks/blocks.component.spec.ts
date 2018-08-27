import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageContentModule, BlocksListModule } from '@explorer/shared';
import { MatProgressSpinnerModule } from '@angular/material';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { of } from 'rxjs';

import { BlocksComponent } from './blocks.component';

describe('BlocksComponent', () => {
  let component: BlocksComponent;
  let fixture: ComponentFixture<BlocksComponent>;
  let publicNodeMock: Partial<LtoPublicNodeService>;

  beforeEach(async(() => {
    publicNodeMock = {
      lastBlocks: () => of([])
    };

    TestBed.configureTestingModule({
      imports: [PageContentModule, BlocksListModule, MatProgressSpinnerModule],
      declarations: [BlocksComponent],
      providers: [
        {
          provide: LtoPublicNodeService,
          useValue: publicNodeMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
