import { Inject, Injectable } from '@angular/core';
import SignClient from '@walletconnect/sign-client';
import { BehaviorSubject } from 'rxjs';
import { LTO_NETWORK_BYTE, WALLETCONNECT_PROJECT_ID } from '@app/tokens';

@Injectable({ providedIn: 'root' })
export class WalletConnectService {
  private client!: SignClient;

  public uri$ = new BehaviorSubject<string | null>(null);
  public session$ = new BehaviorSubject<any>(null);
  public account$ = new BehaviorSubject<{ address: string } | null>(null);
  public request$ = new BehaviorSubject<any>(null);

  constructor(
    @Inject(LTO_NETWORK_BYTE) private networkByte: string,
    @Inject(WALLETCONNECT_PROJECT_ID) private projectId: string,
  ) {}

  async init() {
    const url = this.networkByte === 'T' ? 'https://wallet.testnet.lto.network' : 'https://wallet.lto.network';

    this.client = await SignClient.init({
      projectId: this.projectId,
      metadata: {
        name: 'LTO Web Wallet',
        description: 'LTO Network Web Wallet',
        url,
        icons: [`${url}/lto-icon-512.png`],
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
    const chain = this.networkByte === 'T' ? 'lto:testnet' : 'lto:mainnet';

    const { uri, approval } = await this.client.connect({
      requiredNamespaces: {
        lto: {
          methods: ['lto_signTransaction', 'lto_sendTransaction'],
          chains: [chain],
          events: [],
        },
      },
    });

    if (uri) {
      this.uri$.next(uri);
    }

    const session = await approval();

    const account = session.namespaces.lto?.accounts[0];
    if (!account?.startsWith(`${chain}:`)) {
      this.session$.error('Unable to connect: wrong chain');
      await this.client.disconnect({
        topic: session.topic,
        reason: {
          code: 10,
          message: 'Wrong chain',
        },
      })
      return;
    }

    const address = account?.split(':')[2];

    this.session$.next(session);
    this.account$.next({ address });
  }

  async disconnect() {
    const session = this.session$.value;
    if (!session) return;

    await this.client.disconnect({
      topic: session.topic,
      reason: {
        code: 0,
        message: 'User disconnected',
      },
    });
    this.session$.next(null);
    this.account$.next(null);
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
