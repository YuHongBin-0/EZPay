import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmHistoryPage } from './adm-history.page';

const routes: Routes = [
  {
    path: '',
    component: AdmHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmHistoryPageRoutingModule {}
