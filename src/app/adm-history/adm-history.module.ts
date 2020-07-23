import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmHistoryPageRoutingModule } from './adm-history-routing.module';

import { AdmHistoryPage } from './adm-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmHistoryPageRoutingModule
  ],
  declarations: [AdmHistoryPage]
})
export class AdmHistoryPageModule {}
