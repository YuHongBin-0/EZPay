import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { User } from '../modals/user';
import { Storage } from '@ionic/storage';
import { stringify } from 'querystring';
import { promise } from 'protractor';

// import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  users: Observable<any>
  
  isStudent: boolean;


  UID:string = '';

  constructor(private router: Router, public platform:Platform,  public storage: Storage) { 
    
  }

  ngOnInit() {
   

    var userId = firebase.auth().currentUser.uid
   

      firebase.database().ref(`/users/` + userId).once('value').then(res => {
        var role = (res.val() && res.val().role).toString();
        if (role == "student") {
          this.isStudent = true
        }
        else if (role == "vendor") {
          this.isStudent = false;
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