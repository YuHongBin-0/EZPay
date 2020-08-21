import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddItemsPageRoutingModule } from './add-items-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AddItemsPage } from './add-items.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddItemsPageRoutingModule
  ],
  declarations: [AddItemsPage]
})
export class AddItemsPageModule {}
