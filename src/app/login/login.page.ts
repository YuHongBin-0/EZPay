import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  segment: string;
  constructor(
    private statusBar: StatusBar,
    public platform: Platform,
    public afAuth: AngularFireAuth, public router: Router
  ) {

  }

  ngOnInit() {
    this.segment = 'user';

  }

  ionViewWillEnter() {
  }

  async loginStu() {
		const { username, password } = this
		try {
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@thisisastudentaccount.com', password)
			this.router.navigate(['/tabs'])
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
				window.alert('Account or password is invalid')
			}
		}
	}

  async loginVen() {
		const { username, password } = this
		try {
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@thisisavendoraccount.com', password)
			this.router.navigate(['/tabs'])
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
				window.alert('Account or password is invalid')
			}
		}
	}

  async loginAdm() {
		const { username, password } = this
		try {
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
			this.router.navigate(['/admin'])
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
				window.alert('Account or password is invalid')
			}
		}
	}


}
