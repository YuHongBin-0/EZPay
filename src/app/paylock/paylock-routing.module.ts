import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaylockPage } from './paylock.page';

const routes: Routes = [
  {
    path: '',
    component: PaylockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaylockPageRoutingModule {}
