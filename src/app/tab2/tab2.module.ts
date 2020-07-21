import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { ScanPage } from '../scan/scan.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports:  [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [Tab2Page, ScanPage],
  entryComponents: [ ScanPage]
})
export class Tab2PageModule {}
