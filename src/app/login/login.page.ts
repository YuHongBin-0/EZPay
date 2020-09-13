import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { User } from '../modals/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	username:string = "";
	password:string = "";
	segment: string;

	value: User = {
		email: '',
		password: ''  ,
		uid: ''
		}

	emaaa = this.storage.get('Email').then((val) => {
		var emaaai = val.toString();
		console.log('Email is :', emaaai);
		this.emaaa = emaaai
	  });

	pass = this.storage.get('Password').then((val) => {
		var pasw = val.toString();
		console.log('Email is :', pasw);
		this.pass = pasw
	  });

	constructor(
		private statusBar: StatusBar,
		public platform: Platform,
		public afAuth: AngularFireAuth, public router: Router, public storage: Storage
	) {

	}

	ngOnInit() {
		this.segment = 'user';
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
	}

	loginStud(value) {
		firebase.auth().signInWithEmailAndPassword(value.email + '@thisisastudentaccount.com', value.password)
			.then(() => {
				var uid = firebase.auth().currentUser.uid
				console.log('Log In Successful, UID: ' + uid + 'Email: ' + value.email);
				this.storage.set('UID', uid)
				this.storage.set('Email', value.email);
				this.storage.set('loginComplete', true);
				this.router.navigate(['tabs'])
			})
	}
	
	loginVend(value) {
		firebase.auth().signInWithEmailAndPassword(value.email + '@thisisavendoraccount.com', value.password)
			.then(() => {
				var uid = firebase.auth().currentUser.uid
				console.log('Log In Successful, UID: ' + uid + 'Email: ' + value.email);
				this.storage.set('UID', uid)
				this.storage.set('Email', value.email);
				this.storage.set('loginComplete', true);
				this.router.navigate(['tabs'])
			})
	}

	async loginAdmi() {
		this.platform.ready().then(async _=> {
			const { username, password } = this
			try {
				const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
				if(this.platform.is('cordova') == true){
					this.router.navigate(['/voice']);
				}  else if (this.platform.is('pwa') == true || this.platform.is('desktop') == true){
					this.router.navigate(['/admin']);
				}
			} catch(err) {
				console.dir(err)
				if(err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
					window.alert('Account or password is invalid')
				}
			}
		})
	}

	ionViewWillEnter() {
	}
}