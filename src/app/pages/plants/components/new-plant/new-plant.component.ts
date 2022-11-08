import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-new-plant',
  templateUrl: './new-plant.component.html',
  styleUrls: ['./new-plant.component.scss'],
})
export class NewPlantComponent implements OnInit {

  form: FormGroup;


  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  get tittleField() {
    return this.form.get('name');
  }

  ngOnInit() { }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      type: ['', [Validators.required, Validators.maxLength(100)]],
      variety: ['', [Validators.required, Validators.maxLength(100)]]
    });
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
