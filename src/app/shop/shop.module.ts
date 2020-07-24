import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopPage } from './shop.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ShopPageRoutingModule } from './Shop-routing.module';
import { ExpandableComponent } from "../components/expandable/expandable.component"
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ShopPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [ShopPage, ExpandableComponent]
})
export class ShopPageModule {}
