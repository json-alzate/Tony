import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@shared/shared.module';

import { PlantsPageRoutingModule } from './plants-routing.module';

import { PlantsPage } from './plants.page';
import * as fromComponents from './components/';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlantsPageRoutingModule,
    SharedModule
  ],
  declarations: [
    PlantsPage,
    ...fromComponents.COMPONENTS
  ]
})
export class PlantsPageModule { }
