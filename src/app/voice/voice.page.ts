import { Component, OnInit } from '@angular/core';
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File } from "@ionic-native/file/ngx";
import { Platform } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {
  status: string="";
  audioFile:MediaObject;
  
  constructor(private media:Media, private file:File, private platform: Platform, private base64:Base64) {
  }
  ngOnInit() {
    let filerecord = ".././../assets/Recording.m4a"
    console.log(filerecord)
    
    this.base64.encodeFile(filerecord).then((base64File: string) => {
      
      console.log(base64File);

    }, (err) => {
      console.log(err);
    })
  }

  recordAudio() {
    let fileName: string = "audio.wav"
    this.file.createFile(this.file.externalRootDirectory, fileName, true).then(() => {

      if (this.platform.is('ios')) {
        this.audioFile = this.media.create(this.file.documentsDirectory.replace(/file:\/\//g, '') + fileName);
      }
      else if (this.platform.is('android')) {
        this.audioFile = this.media.create(this.file.externalRootDirectory.replace(/file:\/\//g, '') + fileName);
      }
      
      this.audioFile.release();
      this.audioFile.startRecord();
      this.status = "start recording";
    })
  }

  stopRecording() {
    this.audioFile.stopRecord();
    this.status = "stop recording";
  }

  playAudio() {
    this.audioFile.play();
    this.status = "playing audio";
  }
}

// var settings = {
//   "url": "https://vpr-sg.oneconnectft.com.sg/vprc_dmz/api/verify_no_text",
//   "method": "POST",
//   "timeout": 0,
//   "headers": {
//     "Content-Type": "application/json",
//     "Cookie": "visid_incap_2206674=8hWrL2d6Qa6KVHi8YrqewSDGTF8AAAAAQUIPAAAAAADjjav5aWGE+2fvIV5Eao+5"
//   },
//   "data": JSON.stringify({
//     "appId":"10013",
//     "scene":"sg_temasekpoly_cll",
//     "appIdKey":"2534eb7d19b5427a93fa7449882e1fea",
//     "token":"494cea4ee98171754dc7e61b225baaca",
//     "timestamp":"1552958446757","userId":"1903297",
//     "msgId":"11","serialNumber":"sfsfsefefefsd35",
//     "type":"verify",
//     "file_format":"pcm",
//     "depend":"0",
//     "voice":"base64"}),
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });