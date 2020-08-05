import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewreportPageRoutingModule } from './viewreport-routing.module';

import { ViewreportPage } from './viewreport.page';

import { ExpandableComponent } from "../components/expandable/expandable.component"

import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewreportPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [ViewreportPage, ExpandableComponent]
})
export class ViewreportPageModule {}
