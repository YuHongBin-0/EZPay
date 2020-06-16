import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyqrPageRoutingModule } from './myqr-routing.module';

import { MyqrPage } from './myqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyqrPageRoutingModule
  ],
  declarations: [MyqrPage]
})
export class MyqrPageModule {}
