import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDetailsPage } from './edit-details.page';

const routes: Routes = [
  {
    path: '',
    component: EditDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDetailsPageRoutingModule {}
