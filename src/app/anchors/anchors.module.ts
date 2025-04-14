import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AnchorsComponent } from './anchors.component';
import { FileDropModule, AnchorDetailsModule } from './components';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AnchorsComponent,
  }
];

@NgModule({
  declarations: [AnchorsComponent],
  imports: [
    SharedModule,
    FileDropModule,
    AnchorDetailsModule,
    RouterModule.forChild(routes),
  ]
})
export class AnchorsModule {}
