import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app'
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { stringify } from 'querystring';
import { User } from '../modals/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	username:string = "";
	password:string = "";

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

	
	segment: string;
	
	
    
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
				this.storage.set('Password', value.password);
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
				this.storage.set('Password', value.password);
				this.storage.set('loginComplete', true);
				this.router.navigate(['tabs'])
			})
	}

	async loginAdmi() {
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


	

	ionViewWillEnter() {
	}

	//   async loginStu() {
	// 		// const { username, password } = this
	// 		try {
	// 			const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@thisisastudentaccount.com', password)
	// 			this.router.navigate(['/tabs'])
	// 		} catch(err) {
	// 			console.dir(err)
	// 			if(err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
	// 				window.alert('Account or password is invalid')
	// 			}
	// 		}
	// 	}

	//   async loginVen() {
	// 		const { username, password } = this
	// 		try {
	// 			const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@thisisavendoraccount.com', password)
	// 			this.router.navigate(['/tabs'])
	// 		} catch(err) {
	// 			console.dir(err)
	// 			if(err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
	// 				window.alert('Account or password is invalid')
	// 			}
	// 		}
	// 	}

	//   async loginAdm() {
	// 		const { username, password } = this
	// 		try {
	// 			const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
	// 			this.router.navigate(['/admin'])
	// 		} catch(err) {
	// 			console.dir(err)
	// 			if(err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
	// 				window.alert('Account or password is invalid')
	// 			}
	// 		}
	// 	}


}



