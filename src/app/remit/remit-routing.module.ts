import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemitPage } from './remit.page';

const routes: Routes = [
  {
    path: '',
    component: RemitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemitPageRoutingModule {}
