import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app'
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database'
import { FormBuilder, Validators } from "@angular/forms";
import { Regisven } from '../../modals/regisven'

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
})

export class Page2Page implements OnInit {
  usernames: string = ""
  passwords: string = ""
  regisven = {} as Regisven;

  constructor(public afAuth: AngularFireAuth,
		public afdatabase: AngularFireDatabase,
		public alertController: AlertController,
    public router: Router,
    private formBuilder: FormBuilder) {}

  get name() {
    return this.registrationForm.get("regisven.name");
  }
  get username() {
    return this.registrationForm.get('username');
  }
  get email() {
    return this.registrationForm.get('regisven.email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get department() {
    return this.registrationForm.get('regisven.department');
  }
  get NRIC() {
    return this.registrationForm.get('regisven.NRIC');
  }
  
  get stallNo() {
    return this.registrationForm.get('regisven.stallNo');
  }
  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    username: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      
    ],
    department: [
      { type: 'required', message: 'Department name is required' },
      {
        type: 'maxlength',
        message: 'Department name cant be longer than 100 characters'
      }
    ],
    NRIC: [
      { type: 'required', message: 'NRIC is required' },
      {
        type: 'maxlength',
        message: 'NRIC cant be longer than 9 characters'
      }

    ],
    
    stallNo: [
      { type: 'required', message: 'Stall Number is required' },
      {
        type: 'maxlength',
        message: 'Stall Number cant be longer than 9 characters'
      }
      
    ]
  };
  registrationForm = this.formBuilder.group({
    username: [
      '',
      [Validators.required,Validators.maxLength(100)] ],
    password: [
      '',
      [
        Validators.required,
        
      ]
    ],
    regisven: this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      department: ['', [Validators.required, Validators.maxLength(100)]],
      NRIC: ['', [Validators.required, Validators.maxLength(9)]],
      stallNo: ['', [Validators.required, Validators.maxLength(9)]],
    })
  });


  public submit() {
    console.log(this.registrationForm.value);
  }
  ngOnInit() {
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
		const { usernames, passwords } = this

		try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(usernames + '@thisisavendoraccount.com', passwords)

			this.presentAlert('Success', 'Created A Vendor!')
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
      this.afdatabase.object(`users/${auth.uid}`).set(this.regisven).then(() =>{this.registrationForm.reset()})
      this.afdatabase.object(`users/${auth.uid}/balance`).set(0.00)
      this.afdatabase.object(`users/${auth.uid}/class`).set("")
      this.afdatabase.object(`users/${auth.uid}/level`).set("")
      this.afdatabase.object(`users/${auth.uid}/role`).set("vendor")
    })
   
    
	}

}
  

