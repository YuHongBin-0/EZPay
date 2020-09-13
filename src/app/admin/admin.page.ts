import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminName: string = "anonymous";
  userId: string = "";

  constructor(public router: Router,  public storage: Storage) { }

  ngOnInit() {
    this.storage.get('UID').then((val) => {
      console.log('UID is :', val);
      this.userId = val;
    });
    firebase.database().ref(`users/${this.userId}`).once('value', res => {
      this.adminName = (res.val() && res.val().name);
    })
  }

  manageStudents() { this.router.navigate(['/manage']); }
  manageVendors() { this.router.navigate(['/manage-vendor']); }
  createAccount() { this.router.navigate(['/pages']); }
  adminHistory() { this.router.navigate(['adm-history']); }
  adminReports() { this.router.navigate(['viewreport']); }
  seeReports() { this.router.navigate(['view-request']); }
  voice(){ this.router.navigate(['voice']); }
}