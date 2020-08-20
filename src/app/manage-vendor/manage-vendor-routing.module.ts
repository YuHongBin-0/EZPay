import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageVendorPage } from './manage-vendor.page';

const routes: Routes = [
  {
    path: '',
    component: ManageVendorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageVendorPageRoutingModule {}
