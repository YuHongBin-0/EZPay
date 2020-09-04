import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommitVendorReqPage } from './commit-vendor-req.page';

const routes: Routes = [
  {
    path: '',
    component: CommitVendorReqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitVendorReqPageRoutingModule {}
