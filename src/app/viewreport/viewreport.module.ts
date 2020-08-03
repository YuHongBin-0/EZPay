import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewreportPageRoutingModule } from './viewreport-routing.module';

import { ViewreportPage } from './viewreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewreportPageRoutingModule
  ],
  declarations: [ViewreportPage]
})
export class ViewreportPageModule {}
