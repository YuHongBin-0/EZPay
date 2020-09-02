import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {

  constructor() { }

  

  ngOnInit() {
  }

}


var settings = {
  "url": "https://vpr-sg.oneconnectft.com.sg/vprc_dmz/api/verify_no_text",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
    "Cookie": "visid_incap_2206674=8hWrL2d6Qa6KVHi8YrqewSDGTF8AAAAAQUIPAAAAAADjjav5aWGE+2fvIV5Eao+5"
  },
  "data": JSON.stringify({"appId":"10013","scene":"sg_temasekpoly_cll","appIdKey":"2534eb7d19b5427a93fa7449882e1fea","token":"494cea4ee98171754dc7e61b225baaca","timestamp":"1552958446757","userId":"1903297","msgId":"11","serialNumber":"sfsfsefefefsd35","type":"verify","file_format":"pcm","depend":"0","voice":"base64"}),
};

$.ajax(settings).done(function (response) {
  console.log(response);
});