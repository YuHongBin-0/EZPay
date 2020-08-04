import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  users: Observable<any>
  userId: string;
  isStudent:boolean | null | undefined = true;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {}

  ngOnInit(){
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var role = (snapshot.val() && snapshot.val().role).toString();
      // var role = "vendor";
      console.log('userRole: ' + role)
      if (role.toString() === "student") {
        this.isStudent = true;
        console.log(this.isStudent);
      }
      else if (role === "vendor") {
        this.isStudent = false;
        console.log(this.isStudent);
      }
      return this.isStudent;
    })

  }
  gotoHome (){
    this.router.navigateByUrl('/tabs/tab2');

  }
}