import { Injectable } from '@angular/core';

import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

import { getApp } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage;
  constructor() { }

  init() {
    this.storage = getStorage(getApp());
  }


  uploadImageQuestion(uidQuestion: string, name: string, imageBase64: string): Promise<string> {

    return new Promise((resolve, reject) => {

      const storageRef = ref(this.storage, `questions/${uidQuestion}/${name}.jpg`);
      // Base64 formatted string
      uploadString(storageRef, imageBase64, 'base64').then((snapshot) => {
        console.log('Uploaded a base64 string! ', snapshot);

        // Upload completed successfully, now we can get the download URL
        getDownloadURL(storageRef).then((downloadURL) => {
          resolve(downloadURL);
        });

      }).catch(error => reject(error));


    });



  }


}
