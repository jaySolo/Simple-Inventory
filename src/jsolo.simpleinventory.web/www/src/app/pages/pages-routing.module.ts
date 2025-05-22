import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from '../@auth/admin.guard';
import { AuthGuard } from '../@auth/auth.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'vendors',
        loadChildren: () => import('./vendors/vendors.module')
          .then(m => m.VendorsModule),
      },
      {
        path: 'security',
        // canActivate: [AdminGuard],
        loadChildren: () => import('./security/security.module')
          .then(m => m.SecurityModule),
      },
      // {
      //   path: 'miscellaneous',
      //   loadChildren: () => import('./miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule),
      // },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
