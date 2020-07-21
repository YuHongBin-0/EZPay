import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { Page1PageRoutingModule } from './page1-routing.module';

import { Page1Page } from './page1.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    Page1PageRoutingModule
  ],
  declarations: [Page1Page]
})
export class Page1PageModule {}
