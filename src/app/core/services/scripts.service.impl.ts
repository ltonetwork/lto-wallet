import { Injectable, ClassProvider, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PublicNodeService } from './public-node.service';
import { AuthService } from './auth.service';
import { switchMap, filter, map, shareReplay } from 'rxjs/operators';
import { toPromise } from '../utils';
import { ScriptsService, PredefinedScript } from './scripts.service';

export const enum TRANSACTION_TYPE {
  TRANSFER = 'transfer',
  LEASE = 'lease',
  CANCEL_LEASING = 'cancelLeasing',
  MASS_TRANSFER = 'massTransfer',
  DATA = 'data',
  SET_SCRIPT = 'setScript',
  ANCHOR = 'anchor',
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
  },
  {
    label: 'Delete',
    value: '',
  },
];

const PREDEFINED_SCRIPTS_TEST: PredefinedScript[] = [
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
  },
  {
    label: 'Delete',
    value: '',
  },
];

@Injectable()
export class ScriptsServiceImpl implements ScriptsService {
  predefinedScripts: PredefinedScript[] = PREDEFINED_SCRIPTS;
  scriptEnabled$: Observable<boolean>;
  scriptInfo$: Observable<any>;

  constructor(private _publicNode: PublicNodeService, private _auth: AuthService) {
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

  async createScript(code: string) {
    const wallet: any = await toPromise(this._auth.wallet$);
    return this._publicNode
      .compileScript(code)
      .pipe(
        switchMap((script) => {
          return this._auth.ltoInstance.API.PublicNode.transactions.broadcast(
            TRANSACTION_TYPE.SET_SCRIPT,
            {
              script: script.script,
              fee: 500000000,
            },
            wallet.getSignKeys()
          );
        })
      )
      .toPromise();
  }

  async disabeScript(fee: number) {
    const wallet: any = await toPromise(this._auth.wallet$);
    return this._auth.ltoInstance.API.PublicNode.transactions.broadcast(
      TRANSACTION_TYPE.SET_SCRIPT,
      {
        script: '',
        fee,
      },
      wallet.getSignKeys()
    );
  }
}
