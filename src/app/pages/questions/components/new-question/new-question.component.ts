import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent implements OnInit {

  photo1: string;
  photo2: string;
  tags = ['Automática', 'Feminizada', 'Regular', 'InDoor', 'Exterior', 'Vegetación', 'Floración', 'Poda', 'Plaga'].sort();
  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {

    this.buildForm();

  }

  get tittleField() {
    return this.form.get('title');
  }

  get descriptionField() {
    return this.form.get('description');
  }

  get tagsField() {
    return this.form.get('tags');
  }


  ngOnInit() { }

  buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      tags: []
    });
  }



  async takePhoto(photoOption: number) {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    const imageUrl = image.base64String;

    switch (photoOption) {
      case 1:
        this.photo1 = 'data:image/jpeg;base64,' + imageUrl;
        break;
      case 2:
        this.photo2 = 'data:image/jpeg;base64,' + imageUrl;
        break;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.modalController.dismiss(this.form.value);
    } else {
      this.tittleField.markAsDirty();
      this.descriptionField.markAsDirty();
      this.tagsField.markAsDirty();
    }
  }


  close() {
    this.modalController.dismiss();
  }

}
