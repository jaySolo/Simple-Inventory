import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'new',
    component: ProductDetailsComponent,
  },
  {
    path: ':id/:action',
    component: ProductDetailsComponent,
  },
];

export const ProductsRoutingModule = RouterModule.forChild(routes);
