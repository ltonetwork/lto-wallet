import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BridgeService, BridgeServiceImpl } from './bridge.service';
import { LTO_BRIDGE_HOST, BRIDGE_ENABLED } from '@wallet/tokens';

function configureTestingModule(bridgeEnabled: boolean) {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      BridgeService.provider,
      {
        provide: LTO_BRIDGE_HOST,
        useValue: 'http://test_brige'
      },
      {
        provide: BRIDGE_ENABLED,
        useValue: bridgeEnabled
      }
    ]
  });
}

describe('Core/BridgeService', () => {
  it('should provide BridgeServiceImpl if bridge disabled', () => {
    configureTestingModule(false);
    const service = TestBed.get(BridgeService);
    expect(service instanceof BridgeServiceImpl).toBe(true);
  });

  it('should provide BridgeServiceImpl if bridge disabled', () => {
    configureTestingModule(true);
    const service = TestBed.get(BridgeService);
    expect(service instanceof BridgeServiceImpl).toBe(true);
  });
});

describe('Core/BridgeServiceImpl', () => {
  let bridge: BridgeService;

  beforeEach(() => {
    configureTestingModule(true);

    bridge = TestBed.get(BridgeService);
  });

  it('should create', () => {
    expect(bridge).toBeTruthy();
  });
});
