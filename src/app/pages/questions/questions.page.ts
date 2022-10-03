import { Component, OnInit } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';

// Utils
import { createUid } from '@utils/create-uid';

// Models
import { Question } from '@models/question.model';

// Services
import { FirestoreService } from '@services/firestore.service';


// Components
import { NewQuestionComponent } from '@pages/questions/components/new-question/new-question.component';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
  }

  onSearchChange(event) {

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

      this.firestoreService.addOneQuestion(newQuestion).then(async () => {

        const toast = await this.toastController.create({
          message: 'Pregunta publicada!',
          color: 'success',
          duration: 2000
        });
        toast.present();

      }).catch(async () => {
        const toast = await this.toastController.create({
          message: 'Algo salio mal!',
          color: 'danger',
          duration: 2000
        });
        toast.present();
      });
    }
  }


}
