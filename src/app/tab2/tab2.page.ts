import { Component } from '@angular/core';
import { IonSlides } from '@ionic/angular'
import { ModalController } from '@ionic/angular';
import { PayPage } from '../pay/pay.page';
import { ScanPage } from '../scan/scan.page';
import { RequestPage } from '../request/request.page';
import { MyqrPage } from '../myqr/myqr.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  

  slideOpts = { loop: true };

  constructor(private modalController: ModalController) {}
  async openPay() {
    const modal = await this.modalController.create({
      component: PayPage
    });
    return await modal.present();
  }

  async openScan() {
    const modal = await this.modalController.create({
      component: ScanPage
    });
    return await modal.present();
  }

  async openRequest() {
    const modal = await this.modalController.create({
      component: RequestPage
    });
    return await modal.present();
  }

  async openMyqr() {
    const modal = await this.modalController.create({
      component: MyqrPage
    });
    return await modal.present();
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

}
