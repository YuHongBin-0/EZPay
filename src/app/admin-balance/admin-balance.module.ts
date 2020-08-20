import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminBalancePageRoutingModule } from './admin-balance-routing.module';

import { AdminBalancePage } from './admin-balance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminBalancePageRoutingModule
  ],
  declarations: [AdminBalancePage]
})
export class AdminBalancePageModule {}
