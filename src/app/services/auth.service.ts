//core and third party libraries
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

import { NavController } from '@ionic/angular';

import {
  User as FirebaseUser,
  UserCredential,
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  signInWithPopup,
  signInAnonymously,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithCredential,
  initializeAuth,
  indexedDBLocalPersistence
} from 'firebase/auth';
import { getApp } from 'firebase/app';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


// rxjs
import { from, Subject } from 'rxjs';

// states

// actions

// selectors

// models

// services

// components


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  initialized = false;

  private auth: Auth;

  constructor(
    private navController: NavController
  ) { }



  /**
   * Init the auth service
   */
  init() {
    this.auth = this.whichAuth();
    this.initialized = true;
  }


  /**
   * Returns the active auth component
   *
   * @returns Auth
   */
  whichAuth() {
    let auth;
    if (Capacitor.isNativePlatform()) {
      auth = initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence
      });
    } else {
      auth = getAuth();
    }
    return auth;
  }


  /**
   * Ingresa con Google
   */
  async loginGoogle() {
    const answer = await GoogleAuth.signIn();
    const credential = GoogleAuthProvider.credential(answer.authentication.idToken, answer.authentication.accessToken);
    signInWithCredential(this.auth, credential);
  }

  /**
   * Para escuchar el estado del usuario logueado
   *
   * @returns Subject<FirebaseUser>
   */
  getAuthState(): Subject<FirebaseUser> {
    const authState = new Subject<FirebaseUser>();
    this.auth.onAuthStateChanged(user => {
      authState.next(user);
    });
    return authState;
  }


  async logout(): Promise<void> {
    await this.auth.signOut();
    await this.navController.navigateRoot('/');
  }



}
