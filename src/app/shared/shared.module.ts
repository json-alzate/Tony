import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import * as fromComponents from './components';
import * as fromPipes from './pipes';
import * as fromDirectives from './directives';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents: [
    ...fromComponents.ENTRY_COMPONENTS
  ],
  declarations: [
    ...fromComponents.COMPONENTS,
    ...fromPipes.PIPES,
    ...fromDirectives.DIRECTIVES
  ],
  exports: [
    ...fromComponents.COMPONENTS,
    ...fromPipes.PIPES,
    ...fromDirectives.DIRECTIVES
  ]
})
export class SharedModule { }
