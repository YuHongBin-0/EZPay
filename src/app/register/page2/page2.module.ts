import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { Page2PageRoutingModule } from './page2-routing.module';

import { Page2Page } from './page2.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    Page2PageRoutingModule
  ],
  declarations: [Page2Page]
})
export class Page2PageModule {}
