import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewreportPage } from './viewreport.page';

const routes: Routes = [
  {
    path: '',
    component: ViewreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewreportPageRoutingModule {}
