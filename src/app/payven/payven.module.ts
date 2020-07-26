import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayvenPageRoutingModule } from './payven-routing.module';

import { PayvenPage } from './payven.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayvenPageRoutingModule
  ],
  declarations: [PayvenPage]
})
export class PayvenPageModule {}
