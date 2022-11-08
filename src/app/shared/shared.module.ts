import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...fromComponents.COMPONENTS
  ],
  exports: [
    fromComponents.COMPONENTS
  ]
})
export class SharedModule { }
