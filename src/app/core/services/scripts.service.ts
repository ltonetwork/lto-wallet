import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicNode } from './public-node';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { toPromise } from '../utils';
import { SET_SCRIPT_FEE } from '@app/tokens';
import { SetScript } from '@ltonetwork/lto/transactions';

export interface PredefinedScript {
  label: string;
  value: string;
}

const PREDEFINED_SCRIPTS: PredefinedScript[] = [
  {
    label: 'Restrict account',
    value: `
match tx {
  case t:  TransferTransaction => false
  case mt: MassTransferTransaction => false
  case ss: SetScriptTransaction => false
  case _ => sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPublicKey)
}
    `,
  }
];

const PREDEFINED_SCRIPTS_TEST: PredefinedScript[] = [
  {
    label: 'Restrict account',
    value: `
match tx {
  case t:  TransferTransaction => false
  case mt: MassTransferTransaction => false
  case _ => sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPublicKey)
}
    `,
  }
];

@Injectable({ providedIn: 'root' })
export class ScriptsService {
  predefinedScripts: PredefinedScript[] = PREDEFINED_SCRIPTS;
  scriptEnabled$: Observable<boolean>;
  scriptInfo$: Observable<any>;

  constructor(private _publicNode: PublicNode, private _auth: AuthService, @Inject(SET_SCRIPT_FEE) private fee: number) {
    this.scriptInfo$ = _auth.account$.pipe(
      switchMap((account) => {
        if (!account) {
          throw new Error('No account');
        }
        return _publicNode.getScript(account.address);
      })
    );

    this.scriptEnabled$ = this.scriptInfo$.pipe(
      map((scriptInfo) => {
        return !!scriptInfo.script;
      })
    );
  }

  async getWallet() {
    const wallet = await toPromise(this._auth.wallet$);
    if (!wallet) {
      throw new Error('No wallet');
    }
    return wallet;
  }

  async createScript(code: string) {
    const wallet = await this.getWallet();
    const node = this._auth.lto.node;

    const tx = await node.compile(code);
    await tx.signWith(wallet).broadcastTo(node);
  }

  async disabeScript() {
    const wallet = await this.getWallet();
    const tx = new SetScript();
    await tx.signWith(wallet).broadcastTo(this._auth.lto.node);
  }
}
