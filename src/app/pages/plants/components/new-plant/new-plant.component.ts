//core and third party libraries
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';

// rxjs

// states

// actions

// selectors

// models

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

    } else {

    }
  }

  close() {
    this.modalController.dismiss();
  }

}
