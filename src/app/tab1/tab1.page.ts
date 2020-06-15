import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  list = [
    {
      "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero01%20miya.png?alt=media&token=cbbb2692-ef73-4fbc-8bd9-d75509153dd4",
      "title": "Emblem Information",
      "nav": "emblem"
    },
    {
      "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero03%20saber.png?alt=media&token=6357571c-bf8a-460e-956f-f62ba0e5fa09",
      "title": "Equipment Information",
      "nav": "equipment-info"
    },
    {
      "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero67%20lunox.png?alt=media&token=33a4f129-64d4-478d-9e9f-f67fcae32012",
      "title": "Equipment Calculator",
      "nav": "equipment-calc"
    },
    {
      "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero90%20silvanna.png?alt=media&token=4bb4b41a-9695-4e67-83c5-7e666d986d84",
      "title": "Mini Games - Coming Soon!",
      "nav": "mini-games"
    },
    // {
    //   "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero03%20saber.png?alt=media&token=6357571c-bf8a-460e-956f-f62ba0e5fa09",
    //   "title": "Quiz",
    //   "nav": "quiz"
    // },
    {
      "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero92%20cecilion.png?alt=media&token=175c4d60-09f4-445c-b52f-a5dce1a77384",
      "title": "Donations",
      "nav": "donation"
    },
    // {
    //   "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero24%20natalia.png?alt=media&token=112555d7-2f89-413c-8109-2a55c86e3976",
    //   "title": "Latest Patch Notes!",
    //   "nav": "patch"
    // },
    {
      "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero34%20estes.png?alt=media&token=6a3e2c02-101d-432d-9a5c-c4cdc7d0f9ce",
      "title": "Retribution Damage Chart",
      "nav": "rdc"
    },
    // {
    //   "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero87%20baxia.png?alt=media&token=370b845e-06e7-48bb-8183-16db8b9305ad",
    //   "title": "Rate Us!",
    //   "nav": "rate"
    // },
    {
      "img": "https://firebasestorage.googleapis.com/v0/b/mlguide-ad541.appspot.com/o/heroicon%2Fhero85%20xborg.png?alt=media&token=9f56c1c7-dcd7-4651-8a2b-109050aeb946",
      "title": "Contact Us",
      "nav": "contact"
    },
  ]
  constructor() {}

}
