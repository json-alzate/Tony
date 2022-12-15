//core and third party libraries
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

// rxjs

// states

// actions

// selectors

// models
import { Plant } from '@models/plant.model';

// services

// components
import { CalendarComponent } from '@shared/components/calendar/calendar.component';


@Component({
  selector: 'app-new-plant',
  templateUrl: './new-plant.component.html',
  styleUrls: ['./new-plant.component.scss'],
})
export class NewPlantComponent implements OnInit {

  form: FormGroup;
  types = ['Automática', 'Feminizada', 'Regular'].sort();

  cover: string;
  dateSelected = new Date().getTime();

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  get tittleField() {
    return this.form.get('name');
  }

  ngOnInit() { }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(800)]],
      type: ['', [Validators.required, Validators.maxLength(100)]],
      variety: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }


  async takePhoto() {

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
    this.cover = imageUrl;
  }


  async launchCalendar(ev: any) {
    const popover = await this.popoverController.create({
      component: CalendarComponent,
      componentProps: { setObjetCurrentDate: this.dateSelected },
      event: ev,
      translucent: false
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();
    if (data && data.dateFormatted) {
      this.dateSelected = data.dateFormatted;
    }
  }


  onSubmit() {
    if (this.form.valid) {
      const plantToReturn: Partial<Plant> = {
        name: this.form.value.name,
        description: this.form.value.description,
        type: this.form.value.type,
        variety: this.form.value.variety,
        dateStart: this.dateSelected,
        avatarPlantUrl: this.cover || null
      };
      this.modalController.dismiss(plantToReturn);
    } else {
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
