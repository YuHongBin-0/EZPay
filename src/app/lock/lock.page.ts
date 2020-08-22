import { Component, OnInit, Input } from '@angular/core';
import { FingerprintAIO } from "@ionic-native/fingerprint-aio/ngx";
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { fingerprint } from '@angular/compiler/src/i18n/digest';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.page.html',
  styleUrls: ['./lock.page.scss'],
})
export class LockPage implements OnInit {

  @Input() isModal: boolean;
  

  constructor(private faio: FingerprintAIO, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }

  lock() {
    this.faio.show({
      title: 'Biometric Authentication', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
      subtitle: 'To Unlock Your App,', // (Android Only) | optional | Default: null
      description: 'Please authenticate', // optional | Default: null
      fallbackButtonTitle: 'Use Backup', // optional | When disableBackup is false defaults to "Use Pin".
      // When disableBackup is true defaults to "Cancel"
      disableBackup: true,  // optional | default: false
    })
      .then(() => {
        if (this.isModal) {
          this.modalCtrl.dismiss().then(() => {
            this.modalCtrl.dismiss();
          })
          
        } else {
          this.router.navigateByUrl('/home');
        }
      })
      .catch((error: any) => console.log(error));
  }

}