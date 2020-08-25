import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorReqPageRoutingModule } from './vendor-req-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { VendorReqPage } from './vendor-req.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VendorReqPageRoutingModule
  ],
  declarations: [VendorReqPage]
})
export class VendorReqPageModule {}
