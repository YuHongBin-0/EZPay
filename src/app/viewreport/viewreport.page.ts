import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {MatExpansionModule} from '@angular/material/expansion';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmailComposer} from '@ionic-native/email-composer/ngx'

@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.page.html',
  styleUrls: ['./viewreport.page.scss'],
})
export class ViewreportPage implements OnInit {

  reference = [];
  refItems = firebase.database().ref('reports/').orderByChild('status');
  avail =  true;
  // tslint:disable-next-line: max-line-length
  constructor(public matExpansionModule: MatExpansionModule, private afDatabase: AngularFireDatabase,
              public alertController: AlertController, public afAuth: AngularFireAuth,
              public emailCom: EmailComposer) {


   }

  ngOnInit() {
    this.refItems.on('value', resp => {
    this.reference = snapshotToArray(resp);
  });
  }

  async presentAlertConfirm(key) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Changed to Solve',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: async () => {
            
            
              
              await this.afDatabase.object(`reports/${key}/status`).set("- solved")
            
          }
        }
      ]
    });

    await alert.present();
  }

  async deletePost(key) {
      await this.afDatabase.object(`reports/${key}/`).remove();
    }

    doRefresh(event) {
      console.log('Begin async operation');
      this.refItems.on('value', resp => {
        this.reference = snapshotToArray(resp);
      });
  
      this.checkAvail()
          console.log('Async operation has ended');
          event.target.complete();
  
    }
  
    checkAvail() {
      if (this.reference.length == 0) {
        console.log('true')
        this.avail = true
      } else {
        console.log('false')
        this.avail = false
      }
    }

    SentEmail(key){
      let email = {
        to: key.email,
        subject: 'TP Admin Teams',
        body: 'Text',
        isHtml: true
      };
      
      // Send a text message using default options
      this.emailCom.open(email);
    }
  

}

export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr.reverse();
};

