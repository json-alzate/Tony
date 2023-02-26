import { Component, OnInit } from '@angular/core';

import {
  ModalController, ToastController
} from '@ionic/angular';



// Models
import { Plant } from '@models/plant.model';
import { Profile } from '@models/profile.model';

// Services
import { FirestoreService } from '@services/firestore.service';
import { ProfileService } from '@services/profile.service';
import { PlantService } from '@services/plant.service';
import { AuthService } from '@services/auth.service';


// Components
import { NewPlantComponent } from '@pages/plants/components/new-plant/new-plant.component';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
})
export class PlantsPage implements OnInit {
  loading = false;
  profile: Profile;

  private isAnimating = false;

  constructor(
    private profileService: ProfileService,
    private modalController: ModalController,
    private plantService: PlantService,
    private authService: AuthService,
  ) {
    this.profileService.listenProfile.subscribe(profile => {
      console.log('profile ', profile);

      this.profile = profile;
    });
  }

  ngOnInit() {

  }



  launchLoginGoogle() {
    this.loading = true;
    this.authService.loginGoogle().then(() => {
      this.loading = false;
    }).catch((err) => {
      console.log(err);

      this.loading = false;
      console.log('Error al iniciar sesión', err);

    });
  }

  async presentModalNewPlant() {
    const modal = await this.modalController.create({
      component: NewPlantComponent
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.plantService.savePlant(data).then(() => {
        console.log('Planta guardada');
      }).catch(err => {
        console.log('Error al guardar la planta', err);
      }
      );
    }

  }



}
