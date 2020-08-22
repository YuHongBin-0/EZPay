import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaylockPageRoutingModule } from './paylock-routing.module';

import { PaylockPage } from './paylock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaylockPageRoutingModule
  ],
  declarations: [PaylockPage]
})
export class PaylockPageModule {}
