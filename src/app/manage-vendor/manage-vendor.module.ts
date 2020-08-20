import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageVendorPageRoutingModule } from './manage-vendor-routing.module';

import { ManageVendorPage } from './manage-vendor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageVendorPageRoutingModule
  ],
  declarations: [ManageVendorPage]
})
export class ManageVendorPageModule {}
