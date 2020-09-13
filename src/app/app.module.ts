import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

import { FormsModule } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import 'chartjs-plugin-zoom';

import { PayPal} from '@ionic-native/paypal/ngx';

import * as firebase from 'firebase';
import { LockPageModule } from './lock/lock.module';
import { IonicStorageModule } from '@ionic/storage';

import { EmailComposer} from '@ionic-native/email-composer/ngx';

import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularFireStorageModule } from 'angularfire2/storage';


import { File } from '@ionic-native/file/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { NativeAudio } from '@ionic-native/native-audio/ngx'
import { HTTP } from '@ionic-native/http/ngx'



firebase.initializeApp(environment.firebase);
import { from } from 'rxjs';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, FormsModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule,
     AngularFireDatabaseModule, BrowserAnimationsModule, HttpClientModule, LockPageModule, AngularFireStorageModule],
  providers: [
    StatusBar,
    SplashScreen, InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner, Base64ToGallery, AngularFireAuth,
    AngularFireAuth, PayPal, FingerprintAIO, EmailComposer, Camera, Base64, Crop,
    MediaCapture,
    File,HTTP,
    Media,
    StreamingMedia,
    PhotoViewer,NativeAudio
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
