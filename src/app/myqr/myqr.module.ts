import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyqrPageRoutingModule } from './myqr-routing.module';

import { MyqrPage } from './myqr.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyqrPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [MyqrPage]
})
export class MyqrPageModule {}
