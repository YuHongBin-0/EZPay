import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddItemsPage } from './add-items.page';

const routes: Routes = [
  {
    path: '',
    component: AddItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddItemsPageRoutingModule {}
