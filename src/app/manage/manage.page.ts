import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditDetailsPage } from '../edit-details/edit-details.page';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {

  users = [];
  role = "";
  userToEdit = [];

  constructor(private route: ActivatedRoute, private router: Router, private modalCtrl: ModalController) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.role = this.router.getCurrentNavigation().extras.state.checkRole;
      }
    });
  }

  ngOnInit() {
    console.log(this.role);
    firebase.database().ref('users').on('value', resp => {
      this.users = snapshotToArray(resp);
    });
  }

  createAccount(role:string){
    console.log(role)
    if (role == "student"){
      this.router.navigate(['/pages']);
    }
    else {
      this.router.navigate(['/pages/pages/page2']);
    }
  }

  editDetails(userComponent: string, editedUser: string){
    let navigationExtras: NavigationExtras = {
      state: {
        userComp : userComponent,
        userK: editedUser
      }
    };
    this.router.navigate(['/edit-details'], navigationExtras);
    // const modal = await this.modalCtrl.create({
    //   component: EditDetailsPage,
    //   cssClass: 'my-custom-class'
    // });
    // return await modal.present();
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