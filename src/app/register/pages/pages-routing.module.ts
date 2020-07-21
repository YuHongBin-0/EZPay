import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesPage,
    children : [
      {
        path: 'page1',
        loadChildren: () => import('../../register/page1/page1.module').then( m => m.Page1PageModule)
      },
      {
        path: 'page2',
        loadChildren: () => import('../../register/page2/page2.module').then( m => m.Page2PageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'pages/page1',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
