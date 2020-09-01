import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { SupportTicket } from '../modals/supportTicket';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})

export class ReportPage implements OnInit {

  users: Observable<any>;
  email: string;
  name: string;
  supportTicket = {} as SupportTicket;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private alertCtrl: AlertController) { }

  ngOnInit() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {

      var disEmail = (res.val() && res.val().email);
      this.email = disEmail;
      var disName = (res.val() && res.val().name);
      this.name = disName;

    })
  }

  async genUniqueID() {
    var id:string;
    var finalID:string;
    id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log("initial id is: " + id)
    await firebase.database().ref(`/reports/${id}`).once('value').then(res => {
      var objFromDB = res.val();
      if(objFromDB != null){
        console.log('The reportID "' + id + '" exists and CANNOT be used');
        this.genUniqueID();
      }
      else{
        console.log('The reportID "' + id + '" does not exist and is usable');
        finalID = id;
      }
    });
    return finalID
  }
  
  async sendTicket() {
    var reportID = await this.genUniqueID();
    console.log('reportID: ' + reportID);
    
    var status = 'pending';
    this.afDatabase.object(`reports/${reportID}`).set(this.supportTicket)
    this.afDatabase.object(`reports/${reportID}/date`).set(new Date().toISOString())
    this.afDatabase.object(`reports/${reportID}/status`).set(status)
  }
}