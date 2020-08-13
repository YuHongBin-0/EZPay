import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {

  users = [];

  constructor() { }

  ngOnInit() {
    firebase.database().ref('users').on('value', resp => {
      if (resp.val().role != "admin"){
        this.users = snapshotToArray(resp);
      }
    });
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