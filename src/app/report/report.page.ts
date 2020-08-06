import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { SupportTicket } from '../modals/supportTicket';

function genUniqueID(id:string) {
  try{
    firebase.database().ref(`/reports/${id}`).once('value').then(res => {
      var objFromDB = res.val();
      if(objFromDB != null){
        id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.genUniqueID(id);
      }
      else if(objFromDB == null){
        console.log('The reportID "' + id + '" does not exist');
        return id;
      }
    })
  }catch (error){
    console.log(error)
  }
}

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

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

  ngOnInit() {

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {

      var disEmail = (res.val() && res.val().email);
      this.email = disEmail;
      var disName = (res.val() && res.val().name);
      this.name = disName;

    })
  }
  sendTicket() {
    var randomID;
    var reportID;
    randomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log(randomID, reportID);
    reportID = genUniqueID(randomID);
    this.afDatabase.object(`reports/${randomID}`).set(this.supportTicket)
  }
}