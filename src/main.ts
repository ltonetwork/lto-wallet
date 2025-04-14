import { enableProdMode, ɵsetDocument } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

ɵsetDocument(document); // allows clearer DI tree trace in errors

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
