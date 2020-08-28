import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRequestPageRoutingModule } from './view-request-routing.module';

import { ViewRequestPage } from './view-request.page';

import { ExpandableComponent } from "../components/expandable/expandable.component"

import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRequestPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [ViewRequestPage, ExpandableComponent]
})
export class ViewRequestPageModule {}
