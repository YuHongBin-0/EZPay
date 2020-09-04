import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommitVendorReqPageRoutingModule } from './commit-vendor-req-routing.module';

import { CommitVendorReqPage } from './commit-vendor-req.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommitVendorReqPageRoutingModule
  ],
  declarations: [CommitVendorReqPage]
})
export class CommitVendorReqPageModule {}
