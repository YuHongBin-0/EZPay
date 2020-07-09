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
    path: 'manage-wallet',
    loadChildren: () => import('./manage-wallet/manage-wallet.module').then( m => m.ManageWalletPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  
  },  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'utility',
    loadChildren: () => import('./utility/utility.module').then( m => m.UtilityPageModule)
  },
  {
    path: 'remit',
    loadChildren: () => import('./remit/remit.module').then( m => m.RemitPageModule)
  },
  {
    path: 'tax',
    loadChildren: () => import('./tax/tax.module').then( m => m.TaxPageModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
