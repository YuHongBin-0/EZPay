import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  users: Observable<any>;

  NRIC: string;
  name: string;



  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

  ngOnInit() {

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {

      var disNRIC = (res.val() && res.val().NRIC);
      this.NRIC = disNRIC;
      var disName = (res.val() && res.val().name);
      this.name = disName;


    })
}

}