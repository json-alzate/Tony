import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent implements OnInit {

  tags = ['Automática', 'Feminizada', 'Regular', 'InDoor', 'Exterior', 'Vegetación', 'Floración', 'Poda', 'Plaga'].sort();
  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
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
