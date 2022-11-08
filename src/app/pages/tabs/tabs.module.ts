/** Angular Modules **/
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

/** Components and modules **/
import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs-routing.module';

@NgModule({
  imports: [
    TabsPageRoutingModule,
    IonicModule
  ],
  declarations: [TabsPage],
  providers: []
})
export class TabsPageModule { }
