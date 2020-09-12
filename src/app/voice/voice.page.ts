import { Component , OnInit} from '@angular/core';
import { Base64 } from '@ionic-native/base64/ngx'
import { ActionSheetController, Platform, AlertController } from '@ionic/angular';
import {MediaCapture,MediaFile,CaptureError} from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators'
import { from } from 'rxjs';
import { Router } from '@angular/router';

const MEDIA_FOLDER_NAME = 'Music';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {
  files = [];

  data = [];

  base64text: string;
 
  constructor(
    private base64: Base64,
    private mediaCapture: MediaCapture,
    private file: File,
    private plt: Platform,
    public http: HttpClient,
    private nativeHttp: HTTP,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.plt.ready().then(() => {
      let path = this.file.dataDirectory;
      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
        () => {
          this.loadFiles();
        },
        err => {
          this.file.createDir(path, MEDIA_FOLDER_NAME, false);
        }
      );
    });

    let filePath: string = 'file:///storage/emulated/0/Music/Recordings/Standard Recordings/Standard 1.mp3';

    this.base64.encodeFile(filePath).then((base64Audio: string) => {
      this.base64text = base64Audio.replace("data:image/*;charset=utf-8;base64,","")

    }, (err) => {
      
    })

  }

  async getDataNativeHttp(){
    let loading = await this.loadingCtrl.create();
    await loading.present();

    let nativeCall = this.nativeHttp.post('https://vpr-sg.oneconnectft.com.sg/vprc_dmz/api/verify_no_text', {
      'appId': '10013', 'scene': 'sg_temasekpoly_cll',
      'appIdKey': '2534eb7d19b5427a93fa7449882e1fea', 'token': '494cea4ee98171754dc7e61b225baaca',
      'timestamp': '1552958446757', 'userId': '1903244', 'msgId': '11', 'serialNumber': 'sfsfsefefefsd35',
      'type': 'verify', 'file_format': 'pcm', 'depend': '0', 'voice': this.base64text
    }, {
      'Content-Type': 'application/json'
    });

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(async data => {
      console.log('native data: ', data);
      
      this.data = JSON.parse(data.data);
     

      var dataRes = JSON.parse(data.data)
    
      if (dataRes.data.returnData.code == '603'){
        let alert = await this.alertCtrl.create({
          header: 'Verification successful! You may proceed.',
          buttons: [
            {
              text: 'Continue',
              handler: () => {
                this.router.navigate(['admin'])
              }
            }
          ]
        })
      await alert.present();
      }
    }, err => {
      console.log('JSON Call error: ', err)
    })
  }

  loadFiles() {
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
      res => {
        this.files = res;
      },
      err => console.log('error loading files: ', err)
    );
  }

  recordAudio() {
    this.mediaCapture.captureAudio();
  }
 
}