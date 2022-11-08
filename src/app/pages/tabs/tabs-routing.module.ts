/** Angular Modules **/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Guards **/

/** App components **/
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'questions',
        loadChildren: () => import('../questions/questions.module').then(m => m.QuestionsPageModule),
      },
      {
        path: 'plants',
        loadChildren: () => import('../plants/plants.module').then(m => m.PlantsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/questions',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
