import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './vendors.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';

const routes: Routes = [
  {
    path: '',
    component: VendorsComponent,
  },
  {
    path: 'new',
    component: VendorDetailsComponent,
  },
  {
    path: ':id/:action',
    component: VendorDetailsComponent,
  },
];

export const VendorsRoutingModule = RouterModule.forChild(routes);
