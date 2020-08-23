import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
// import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  users: Observable<any>
  userId: string;
  isStudent: boolean;
  subscribe:any;

  constructor(private router: Router, public platform:Platform) { 
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666,()=> {
      if(this.constructor.name == "TabsPage")
      {
        if(window.confirm("Do you want to exit EzPay?"))
        {
          navigator["app"].exitApp();
        }
      }
  
  })
  }

  ngOnInit() {
    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {
      var role = (res.val() && res.val().role).toString();

      console.log('userRole: ' + role)
      if (role == "student") {
        console.log('student')
        this.isStudent = true
        console.log(this.isStudent);
      }
      else if (role == "vendor") {
        console.log('vendor')
        this.isStudent = false;
        console.log(this.isStudent)
      }
    })
  }

  gotoHome() {
    this.router.navigateByUrl('/tabs/tab2');

  }

  test() {
    console.log(this.isStudent)
  }
}