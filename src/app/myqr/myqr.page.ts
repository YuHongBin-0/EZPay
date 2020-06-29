import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-myqr',
  templateUrl: './myqr.page.html',
  styleUrls: ['./myqr.page.scss'],
})
export class MyqrPage implements OnInit {

  qrData = 'Your number : +65 83817047';
  scannedCode = null;
  elementType: 'canvas';

  constructor(private modalController: ModalController,private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController) {}
  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  // downloadQR(){
  //   const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  //   const imageData = canvas.toDataURL('image/jpeg').toString();
  //   console.log('data: ', imageData);

  //   let data = imageData.split(',')[1];

  //   this.base64ToGallery.base64ToGallery(data, 
  //     {prefix: '_img', mediaScanner: true})
  //     .then(async res => {
  //         let toast = await this.toastCtrl.create({
  //           header: 'QR Code saved in your PhotoLibrary'
  //         });
  //         toast.present();
  //     }, err => console.log('err:', err)
  //     );
  // }

}
