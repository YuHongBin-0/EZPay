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
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'manage',
    loadChildren: () => import('./manage/manage.module').then( m => m.ManagePageModule)
  },
  {
    path: 'edit-details',
    loadChildren: () => import('./edit-details/edit-details.module').then( m => m.EditDetailsPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./register/pages/pages.module').then( m => m.PagesPageModule)
  },
  {
    path: 'page1',
    loadChildren: () => import('./register/page1/page1.module').then( m => m.Page1PageModule)
  },
  {
    path: 'page2',
    loadChildren: () => import('./register/page2/page2.module').then( m => m.Page2PageModule)
  },
  {
    path: 'adm-history',
    loadChildren: () => import('./adm-history/adm-history.module').then( m => m.AdmHistoryPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'payven',
    loadChildren: () => import('./payven/payven.module').then( m => m.PayvenPageModule)
  },
  {
    path: 'viewreport',
    loadChildren: () => import('./viewreport/viewreport.module').then( m => m.ViewreportPageModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then( m => m.StatisticPageModule)
  },
  {
    path: 'manage-vendor',
    loadChildren: () => import('./manage-vendor/manage-vendor.module').then( m => m.ManageVendorPageModule)
  },
  {
    path: 'admin-balance',
    loadChildren: () => import('./admin-balance/admin-balance.module').then( m => m.AdminBalancePageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
