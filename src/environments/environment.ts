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
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
