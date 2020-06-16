import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pay',
    loadChildren: () => import('./pay/pay.module').then( m => m.PayPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'myqr',
    loadChildren: () => import('./myqr/myqr.module').then( m => m.MyqrPageModule)
  },
  {
<<<<<<< HEAD
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
=======
    path: 'manage-wallet',
    loadChildren: () => import('./manage-wallet/manage-wallet.module').then( m => m.ManageWalletPageModule)
>>>>>>> f9aa0c50bf2c1811ec269eef6aa3b2d484b6fbb5
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
