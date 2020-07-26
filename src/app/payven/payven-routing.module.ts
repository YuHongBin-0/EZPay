import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayvenPage } from './payven.page';

const routes: Routes = [
  {
    path: '',
    component: PayvenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayvenPageRoutingModule {}
