import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-myqr',
  templateUrl: './myqr.page.html',
  styleUrls: ['./myqr.page.scss'],
})
export class MyqrPage implements OnInit {

  constructor(private modalController: ModalController) {}
  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
