import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  constructor(private modalController: ModalController) {}
  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }


}
