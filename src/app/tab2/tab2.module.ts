import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { PayPage } from '../pay/pay.page';
import { ScanPage } from '../scan/scan.page';
import { RequestPage } from '../request/request.page';
import { MyqrPage } from '../myqr/myqr.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page, PayPage, ScanPage, RequestPage, MyqrPage],
  entryComponents: [PayPage, ScanPage, RequestPage, MyqrPage]
})
export class Tab2PageModule {}
