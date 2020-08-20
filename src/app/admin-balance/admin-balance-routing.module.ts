import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminBalancePage } from './admin-balance.page';

const routes: Routes = [
  {
    path: '',
    component: AdminBalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminBalancePageRoutingModule {}
