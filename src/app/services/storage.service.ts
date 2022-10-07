import { Injectable } from '@angular/core';

import { getStorage, ref, uploadString } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = getStorage();
  constructor() { }


  uploadImage() {
    const storageRef = ref(this.storage, '');
    // Base64 formatted string
    const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
    uploadString(storageRef, message2, 'base64').then((snapshot) => {
      console.log('Uploaded a base64 string!');
    });
  }


}
