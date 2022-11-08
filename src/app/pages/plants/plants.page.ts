import { Component, OnInit } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';


// Models
import { Plant } from '@models/plant.model';
import { Profile } from '@models/profile.model';

// Services
import { FirestoreService } from '@services/firestore.service';
import { ProfileService } from '@services/profile.service';


// Components
import { NewPlantComponent } from '@pages/plants/components/new-plant/new-plant.component';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
})
export class PlantsPage implements OnInit {

  profile: Profile;

  constructor(
    private profileService: ProfileService,
    private modalController: ModalController
  ) {
    this.profileService.listenProfile.subscribe(profile => {
      console.log('profile ', profile);

      this.profile = profile;
    });
  }

  ngOnInit() {
  }


  async presentModalNewPlant() {
    const modal = await this.modalController.create({
      component: NewPlantComponent,
      componentProps: { value: 123 }
    });

    await modal.present();

  }

}
