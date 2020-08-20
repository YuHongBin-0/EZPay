import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditDetailsPage } from '../edit-details/edit-details.page';
import { AdminBalancePage } from '../admin-balance/admin-balance.page';

@Component({
  selector: 'app-manage-vendor',
  templateUrl: './manage-vendor.page.html',
  styleUrls: ['./manage-vendor.page.scss'],
})
export class ManageVendorPage implements OnInit {

  users = [];
  userToEdit = [];

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    firebase.database().ref('users').on('value', resp => {
      this.users = snapshotToArray(resp);
    });
  }

  createAccount(){
    this.router.navigate(['/pages/page2']);
  }

  async editDetails(fieldToEdit:string, editedUser: string){
    if(fieldToEdit == 'details'){
      const modal = await this.modalCtrl.create({
        component: EditDetailsPage,
        componentProps: {
          userK: editedUser
        }
      });
      return await modal.present();
    } else if (fieldToEdit == 'balance'){
      const modal = await this.modalCtrl.create({
        component: AdminBalancePage,
        componentProps: {
          userK: editedUser
        }
      });
      return await modal.present();
    }
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