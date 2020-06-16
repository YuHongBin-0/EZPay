import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyqrPage } from './myqr.page';

const routes: Routes = [
  {
    path: '',
    component: MyqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyqrPageRoutingModule {}
