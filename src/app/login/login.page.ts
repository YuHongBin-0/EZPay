import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  segment: string;
  constructor(
    private statusBar: StatusBar,
    public platform: Platform
  ) {

  }

  ngOnInit() {
    this.segment = 'user';

  }

  ionViewWillEnter() {


  }
}
