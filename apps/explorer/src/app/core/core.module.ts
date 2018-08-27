import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule, MatSnackBarModule],
  exports: [],
  declarations: []
})
export class CoreModule {}
