import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtilityPageRoutingModule } from './utility-routing.module';

import { UtilityPage } from './utility.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtilityPageRoutingModule
  ],
  declarations: [UtilityPage]
})
export class UtilityPageModule {}
