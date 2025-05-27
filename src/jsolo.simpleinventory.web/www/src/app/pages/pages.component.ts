import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

// import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu: NbMenuItem[] = [];

  constructor() {
    this.menu.push(
      {
        title: 'Overview',
        icon: 'monitor-outline',
        link: '/pages/dashboard',
      },
      {
        title: 'Vendors',
        icon: 'people',
        // hidden: !this.hasPermission('api/vendors', permissions),
        link: '/pages/vendors',
      },
      {
        title: 'Products',
        icon: 'archive-outline',
        // hidden: !this.hasPermission('api/vendors', permissions),
        link: '/pages/products',
      },
      {
        title: 'Inventories',
        icon: 'list-outline',
        // hidden: !this.hasPermission('api/vendors', permissions),
        link: '/pages/inventories',
      },
      {
        title: 'System Security',
        // hidden: !this.hasPermission('security/', permissions),
        icon: 'shield',
        children: [
          {
            title: 'Users',
            // hidden: !this.hasPermission('security/users', permissions),
            link: '/pages/security/users',
          },
          {
            title: 'User Roles',
            // hidden: !this.hasPermission('security/roles', permissions),
            link: '/pages/security/roles',
          },
          {
            title: 'Permissions',
            // hidden: !this.hasPermission('security/permissions', permissions),
            link: '/pages/security/permissions',
          },
        ],
      },
    );
  }
}
