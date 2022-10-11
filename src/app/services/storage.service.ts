import { Injectable } from '@angular/core';

import { getStorage, ref, uploadString } from 'firebase/storage';

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


  uploadImageQuestion(uidQuestion: string, imageBase64: string) {
    const storageRef = ref(this.storage, `questions/${uidQuestion}`);
    // Base64 formatted string
    uploadString(storageRef, imageBase64, 'base64').then((snapshot) => {
      console.log('Uploaded a base64 string! ', snapshot);
    });
  }


}
