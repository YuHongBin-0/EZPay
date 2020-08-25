import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorReqPage } from './vendor-req.page';

const routes: Routes = [
  {
    path: '',
    component: VendorReqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorReqPageRoutingModule {}
