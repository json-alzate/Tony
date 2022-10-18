import { Component, OnInit } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';

// Utils
import { createUid } from '@utils/create-uid';

// Models
import { Question } from '@models/question.model';
import { Profile } from '@models/profile.model';

// Services
import { FirestoreService } from '@services/firestore.service';
import { ProfileService } from '@services/profile.service';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';


// Components
import { NewQuestionComponent } from '@pages/questions/components/new-question/new-question.component';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  loading = false;
  profile: Profile;

  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private firestoreService: FirestoreService,
    private profileService: ProfileService,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.profileService.listenProfile.subscribe(profile => {
      console.log('profile ', profile);

      this.profile = profile;
    });
  }

  ngOnInit() {
  }

  onSearchChange(event) {

  }

  launchLoginGoogle() {
    this.loading = true;
    this.authService.loginGoogle().then(() => {
      this.loading = false;
    }).catch((err) => {
      console.log(err);

      this.loading = false;
      this.errorToast();
    });
  }

  async presentNewQuestionModal() {
    const modal = await this.modalController.create({
      component: NewQuestionComponent,
      componentProps: { value: 123 }
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    if (data.data) {

      const newQuestion: Question = {
        uid: createUid(),
        date: new Date().getTime(),
        description: data.data.description,
        title: data.data.title,
        tags: data.data.tags || [],
        likes: 0,
        uidProfile: '',
        photos: []
      };

      if (data.data.photo1) {
        const urlImg1 = await this.storageService.uploadImageQuestion(newQuestion.uid, '1', data.data.photo1);
        newQuestion.photos.push(urlImg1);
      }
      if (data.data.photo2) {
        const urlImg2 = await this.storageService.uploadImageQuestion(newQuestion.uid, '2', data.data.photo2);
        newQuestion.photos.push(urlImg2);
      }

      this.firestoreService.addOneQuestion(newQuestion).then(async () => {

        const toast = await this.toastController.create({
          message: 'Pregunta publicada!',
          color: 'success',
          duration: 2000
        });
        toast.present();

      }).catch((err) => {
        console.log(err);
        this.errorToast();
      });
    }
  }


  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Algo salio mal!',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }


}
