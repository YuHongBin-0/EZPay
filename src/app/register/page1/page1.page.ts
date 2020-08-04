import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app'
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database'
import { FormBuilder, Validators } from "@angular/forms";
import { Registu } from '../../modals/registu'

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {
  usernames: string = ""
  password: string = ""
  registu = {} as Registu;

  constructor(public afAuth: AngularFireAuth,
		public afdatabase: AngularFireDatabase,
		public alertController: AlertController,
    public router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  get name() {
    return this.registrationForm.get("registu.name");
  }
  get username() {
    return this.registrationForm.get('username');
  }
  get email() {
    return this.registrationForm.get('registu.email');
  }
  get passwords() {
    return this.registrationForm.get('password');
  }
  get year() {
    return this.registrationForm.get('registu.year');
  }
  get class() {
    return this.registrationForm.get('registu.class');
  }
  get NRIC() {
    return this.registrationForm.get('registu.NRIC');
  }
  
  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' },
     
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'maxlength', message: 'Username cant be longer than 100 characters' },
    ],
    passwords: [
      { type: 'required', message: 'Password is required' },
      
    ],
    class: [
      { type: 'required', message: 'Class name is required' },
      {
        type: 'maxlength',
        message: 'Class name cant be longer than 100 characters'
      }
    ],
    NRIC: [
      { type: 'required', message: 'NRIC is required' },
      {
        type: 'maxlength',
        message: 'NRIC cant be longer than 9 characters'
      }

    ],
    year:[],
  };
  registrationForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.maxLength(100)]],
    passwords: [
      '',
      [
        Validators.required,
        
      ]
    ],
    registu: this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      class: ['', [Validators.required, Validators.maxLength(100)]],
      NRIC: ['', [Validators.required, Validators.maxLength(9)]],
      year:['',[]],
      email: ['',[ Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    })
  });
  public submit() {
    console.log(this.registrationForm.value);
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }
  

  async register() {
		const { usernames, password } = this

		try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(usernames + '@thisisastudentaccount.com', password)

			this.presentAlert('Success', 'Created A Student!')
		} catch(err) {
      console.dir(err)
      if(err.code === "auth/email-already-in-use") {
        window.alert('Email is already in use')}
        if(err.code === "auth/invalid-email") {
          window.alert('Invalid Email')}
          if(err.code === "auth/weak-password") {
            window.alert('Weak Password')}
    }

    this.afAuth.authState.subscribe(auth => {
      this.afdatabase.object(`users/${auth.uid}`).set(this.registu)
    })
    this.afAuth.authState.subscribe(auth => {
      this.afdatabase.object(`users/${auth.uid}/balance`).set("0.00")
    })
    this.afAuth.authState.subscribe(auth => {
      this.afdatabase.object(`users/${auth.uid}/stallNo`).set("")
    })
    this.afAuth.authState.subscribe(auth => {
      this.afdatabase.object(`users/${auth.uid}/department`).set("")
    })
    this.afAuth.authState.subscribe(auth => {
      this.afdatabase.object(`users/${auth.uid}/role`).set("student")
    })
    
    
	}

}
