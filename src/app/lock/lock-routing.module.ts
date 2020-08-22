import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LockPage } from './lock.page';

const routes: Routes = [
  {
    path: '',
    component: LockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LockPageRoutingModule {}
