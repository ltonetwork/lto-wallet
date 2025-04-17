// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  networkByte: 'T',
  transfer_fee: 100000000,
  mass_transfer_fee: 10000000,
  anchor_fee:   35000000,
  set_script_fee: 500000000,
  bridge: true,
  swapPageEnabled: true,
  recaptcha_site_key: '',
  lto_api_url: 'https://testnet.lto.network/',
  bridge_url: 'https://bridge.testnet.lto.network',
  mobile_auth: {
    ws: 'wss://wallet-auth.testnet.lto.network/connect',
    url: 'https://wallet-auth.testnet.lto.network/'
  },
  walletConnect: {
    project_id: '33225890e740db4296f936ebd487b902'
  },
};
