import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemitPageRoutingModule } from './remit-routing.module';

import { RemitPage } from './remit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemitPageRoutingModule
  ],
  declarations: [RemitPage]
})
export class RemitPageModule {}
