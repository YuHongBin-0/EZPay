import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilityPage } from './utility.page';

const routes: Routes = [
  {
    path: '',
    component: UtilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilityPageRoutingModule {}
