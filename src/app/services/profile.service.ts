import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';

// models
import { User as FirebaseUser } from 'firebase/auth';
import { Profile } from '@models/profile.model';

// services
import { FirestoreService } from '@services/firestore.service';
import { AuthService } from '@services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private observableProfile = new Observable<Profile>((observer) => {
    this.observerProfile = observer;
  });
  private observerProfile: Subscriber<Profile>;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) { }

  get listenProfile() {
    return this.observableProfile;
  }

  /**
   * Valida si el perfil existe en la BD y lo lleva al estado redux
   *
   * @param dataAuth
   */
  async checkProfile(dataAuth: FirebaseUser) {

    const profile = await this.firestoreService.getProfile(dataAuth?.uid);
    if (profile) {
      this.observerProfile.next(profile);
    } else {
      // crear perfil
      const newProfile: Profile = {
        uid: dataAuth.uid,
        email: dataAuth.email,
        name: dataAuth.displayName,
        avatarUrl: dataAuth.photoURL,
        createAt: new Date().getTime(),
        rating: 0
      };
      await this.firestoreService.createProfile(newProfile);

    }

  }

}
