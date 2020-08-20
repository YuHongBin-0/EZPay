import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { ToastController, IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  slideOpts = { loop: true };
  users: Observable<any>
  userId: string;
  isStudent: boolean;
  infos = [];
  slide = [];
  balance: number;
  name: string;
  ref2 = firebase.database().ref('slide/');

  constructor(private modalController: ModalController, private iab: InAppBrowser,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private toast: ToastController, private router: Router) { }

  options: InAppBrowserOptions = {
    location: 'yes',
    hidden: 'no',
    // clearcache: 'yes',
    // clearsessioncache: 'yes',
    // cleardata: 'yes', // iOS only
    zoom: 'no', // Android only
    hardwareback: 'yes', // Android only, navigate backwards through the InAppBrowser's history
    mediaPlaybackRequiresUserAction: 'yes',
    lefttoright: 'yes', // navigation buttons go to the left and close button to the right
    shouldPauseOnSuspend: 'yes', // Android only, make InAppBrowser WebView to pause/resume with the app to stop background audio
    hideurlbar: 'yes', // Android only, hide the url bar on the location toolbar
    // toolbar: 'yes', // iOS only
    toolbarcolor: '#1b1b1b',
    navigationbuttoncolor: 'red',
    footercolor: 'white', // Android only
    hidenavigationbuttons: 'yes',
    closebuttoncolor: '#CABD24',
    toolbarposition: 'bottom',
    allowInlineMediaPlayback: 'yes',
    enableViewportScale: 'yes',
    // disallowoverscroll: 'yes'
    // closebuttoncaption: 'Close',
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  ngOnInit() {
    this.ref2.on('value', resp => {
      this.slide = snapshotToArray1(resp);
    });

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {
      var bal = (res.val() && res.val().balance);
      this.balance = bal;
      var disName = (res.val() && res.val().name);
      this.name = disName;
      console.log(this.name + " has $" + this.balance);
      
    })

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

  open(youtube) {
    this.iab.create(youtube, '_blank', this.options);
  }

  openPay() {
    this.router.navigate(['/payment']);
  }
  openPayven() {
    this.router.navigate(['/payven']);
  }

  openStats(){
    this.router.navigate(['/statistic']);
  }

  ionViewWillEnter() {
    // this.afAuth.authState.subscribe(async data => {
    //   if (data && data.uid) {

    //     this.users = this.afDatabase.object(`users/${data.uid}`).valueChanges();
    //   }
    //   else {
    //     (await this.toast.create({
    //       message: `Could not find authentication details.`,
    //       duration: 3000
    //     })).present();
    //   }
    // });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(res => {
      var bal = (res.val() && res.val().balance);
      this.balance = bal;
      var disName = (res.val() && res.val().name);
      this.name = disName;
      console.log(this.name + " has $" + this.balance);
      
    })
    console.log('Async operation has ended');
    event.target.complete();

  }

  
}

export const snapshotToArray1 = snapshot => { // for slides
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr.reverse();
};
