import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  constructor(private modalController: ModalController) {}
  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
