import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
 
const MEDIA_FOLDER_NAME = 'my_media';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {

  files = [];

  constructor(private nativeAudio: NativeAudio,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private plt: Platform) { }

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
  }

  loadFiles() {
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
      res => {
        this.files = res;
      },
      err => console.log('error loading files: ', err)
    );
  }

  record() {
    this.mediaCapture.captureAudio().then(
      (data: MediaFile[]) => {
        if (data.length > 0) {
          this.copyFileToLocalDir(data[0].fullPath);
        }
      },
      (err: CaptureError) => console.error(err)
    );
  }

  openFile(f: FileEntry) {
    const path = f.nativeURL.replace(/^file:\/\//, '');
    const audioFile: MediaObject = this.media.create(path);
    audioFile.play();
  }

  deleteFile(f: FileEntry) {
    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
    this.file.removeFile(path, f.name).then(() => {
      this.loadFiles();
    }, err => console.log('error remove: ', err));
  }

  copyFileToLocalDir(fullPath) {
    let myPath = fullPath;
    // Make sure we copy from the right location
    if (fullPath.indexOf('file://') < 0) {
      myPath = 'file://' + fullPath;
    }

    const ext = myPath.split('.').pop();
    const d = Date.now();
    const newName = `${d}.${ext}`;

    const name = myPath.substr(myPath.lastIndexOf('/') + 1);
    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;

    this.file.copyFile(copyFrom, name, copyTo, newName).then(
      success => {
        this.loadFiles();
      },
      error => {
        console.log('error: ', error);
      }
    );
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
//   "data": JSON.stringify({"appId":"10013","scene":"sg_temasekpoly_cll","appIdKey":"2534eb7d19b5427a93fa7449882e1fea","token":"494cea4ee98171754dc7e61b225baaca","timestamp":"1552958446757","userId":"1903297","msgId":"11","serialNumber":"sfsfsefefefsd35","type":"verify","file_format":"pcm","depend":"0","voice":"base64"}),
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });