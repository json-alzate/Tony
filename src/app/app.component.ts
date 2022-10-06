import { Component } from '@angular/core';
import { isPlatform } from '@ionic/angular';
import { environment } from '@environments/environment';
import { initializeApp } from 'firebase/app';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import { AuthService } from '@services/auth.service';
import { FirestoreService } from '@services/firestore.service';
import { ProfileService } from '@services/profile.service';
import { User as FirebaseUser } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private profileService: ProfileService
  ) {
    this.initFirebase();
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  async initFirebase() {
    initializeApp(environment.firebase);
    await this.authService.init();
    await this.firestoreService.init();
    // se obtiene el estado del usuario -login-
    this.authService.getAuthState().subscribe((dataAuth: FirebaseUser) => {
      // se obtienen los datos del usuario, sino existe se crea el nuevo usuario
      console.log('dataaut', dataAuth);

      if (dataAuth) {
        this.profileService.checkProfile(dataAuth);
      } else {
        // No tiene auth
      }
    });

  }
}
