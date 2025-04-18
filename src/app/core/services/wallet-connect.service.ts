import { Inject, Injectable } from '@angular/core';
import SignClient from '@walletconnect/sign-client';
import { BehaviorSubject } from 'rxjs';
import { LTO_NETWORK_BYTE, WALLETCONNECT_PROJECT_ID } from '@app/tokens';
import { Transaction } from '@ltonetwork/lto/transactions';
import { ContentDialogComponent } from '@app/components';
import { MatDialog } from '@angular/material/dialog';

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
    private matDialog: MatDialog,
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

    this.client.on('session_request', request => {
      this.request$.next(request);
    });
  }

  async pair() {
    const chain = this.networkByte === 'T' ? 'lto:testnet' : 'lto:mainnet';

    const { uri, approval } = await this.client.connect({
      requiredNamespaces: {
        lto: {
          methods: ['lto_signTransaction'],
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

  public async sign<T extends Transaction>(tx: T): Promise<T> {
    if (!this.client || !this.session$.value) {
      throw new Error('WalletConnect not initialized or session missing');
    }

    const session = this.session$.value;

    const contentDialog = this.matDialog.open(ContentDialogComponent, {
      disableClose: true,
      data: {
        title: 'Awaiting confirmation from WalletConnect',
        content: 'Please review the transaction in your wallet application',
      },
    });

    try {
      const result = await this.client.request({
        topic: session.topic,
        chainId: this.networkByte === 'T' ? 'lto:testnet' : 'lto:mainnet',
        request: {
          method: 'lto_signTransaction',
          params: {
            transaction: tx.toJSON(),
          },
        },
      }) as Transaction;

      if (result.sender !== this.account$.value?.address) {
        throw new Error('Sender address mismatch');
      }

      tx.sender = result.sender;
      tx.senderKeyType = result.senderKeyType;
      tx.senderPublicKey = result.senderPublicKey;
      tx.timestamp = result.timestamp;
      tx.proofs = result.proofs;

      return tx;
    } finally {
      contentDialog.close();
    }
  }
}
