import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaxPageRoutingModule } from './tax-routing.module';

import { TaxPage } from './tax.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaxPageRoutingModule
  ],
  declarations: [TaxPage]
})
export class TaxPageModule {}
