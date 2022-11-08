//core and third party libraries
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

// rxjs

// states

// actions

// selectors

// models

// services

// components


@Component({
  selector: 'app-new-plant',
  templateUrl: './new-plant.component.html',
  styleUrls: ['./new-plant.component.scss'],
})
export class NewPlantComponent implements OnInit {

  form: FormGroup;
  types = ['Automática', 'Feminizada', 'Regular'].sort();

  cover: string;


  constructor(
    private modalController: ModalController,
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

  launchCalendar(event: any) {
    console.log('launchCalendar');
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
