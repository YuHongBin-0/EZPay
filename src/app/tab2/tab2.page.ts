import { Component } from '@angular/core';
import { IonSlides } from '@ionic/angular'
import { ModalController } from '@ionic/angular';
import { PayPage } from '../pay/pay.page';
import { ScanPage } from '../scan/scan.page';
import { RequestPage } from '../request/request.page';
import { MyqrPage } from '../myqr/myqr.page';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  slideOpts = { loop: true };

  constructor(private modalController: ModalController, private barcodeScanner: BarcodeScanner) {
    this.encodeData = "https://www.FreakyJolly.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }


  async openPay() {
    const modal = await this.modalController.create({
      component: PayPage
    });
    return await modal.present();
  }

  openScan() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
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
