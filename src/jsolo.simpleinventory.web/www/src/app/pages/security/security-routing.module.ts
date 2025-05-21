import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule),
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module')
      .then(m => m.RolesModule),
  },
  {
    path: 'permissions',
    loadChildren: () => import('./permissions/permissions.module')
      .then(m => m.PermissionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
