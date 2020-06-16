import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  constructor(private modalController: ModalController) {}
  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
