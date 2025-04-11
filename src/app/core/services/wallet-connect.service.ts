import { Inject, Injectable } from '@angular/core';
import SignClient from '@walletconnect/sign-client';
import { BehaviorSubject } from 'rxjs';
import { LTO_NETWORK_BYTE, WALLETCONNECT_PROJECT_ID } from '@app/tokens';

@Injectable({ providedIn: 'root' })
export class WalletConnectService {
  private client!: SignClient;

  public uri$ = new BehaviorSubject<string | null>(null);
  public session$ = new BehaviorSubject<any>(null);
  public request$ = new BehaviorSubject<any>(null);

  constructor(
    @Inject(LTO_NETWORK_BYTE) private networkByte: string,
    @Inject(WALLETCONNECT_PROJECT_ID) private projectId: string,
  ) {}

  async init() {
    this.client = await SignClient.init({
      projectId: this.projectId,
      metadata: {
        name: 'LTO Web Wallet',
        description: 'LTO Network Web Wallet',
        url: 'https://wallet.lto.network',
        icons: ['https://wallet.lto.network/lto-icon-512.png'],
      },
    });

    this.client.on('session_proposal', proposal => {
      // Handle session proposal if acting as a wallet
    });

    this.client.on('session_request', request => {
      this.request$.next(request);
    });
  }

  async pair() {
    const { uri, approval } = await this.client.connect({
      requiredNamespaces: {
        lto: {
          methods: ['lto_signTransaction', 'lto_sendTransaction'],
          chains: [this.networkByte === 'T' ? 'lto:testnet' : 'lto:mainnet'],
          events: [],
        },
      },
    });

    if (uri) {
      this.uri$.next(uri);
    }

    const session = await approval();
    this.session$.next(session);
  }

  async respondRequest(topic: string, id: number, result: any) {
    await this.client.respond({
      topic,
      response: {
        id,
        jsonrpc: '2.0',
        result,
      },
    });
  }

  async rejectRequest(topic: string, id: number, error: any) {
    await this.client.respond({
      topic,
      response: {
        id,
        jsonrpc: '2.0',
        error,
      },
    });
  }
}
