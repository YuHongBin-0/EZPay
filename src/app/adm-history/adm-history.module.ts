import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmHistoryPageRoutingModule } from './adm-history-routing.module';

import { AdmHistoryPage } from './adm-history.page';

import { ExpandableComponent } from "../components/expandable/expandable.component"

import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmHistoryPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [AdmHistoryPage, ExpandableComponent]
})
export class AdmHistoryPageModule {}
