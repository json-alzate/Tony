import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionsPageRoutingModule } from './questions-routing.module';

import { QuestionsPage } from './questions.page';
import * as fromComponents from './components/';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QuestionsPageRoutingModule
  ],
  declarations: [
    QuestionsPage,
    ...fromComponents.COMPONENTS,
  ]
})
export class QuestionsPageModule { }
