import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbAuthModule } from '@nebular/auth';

import { HttpService } from './http.service';
import { VendorsData } from '../../interfaces/vendor';
import { VendorsService } from '../services/vendors.service';
import { UsersData } from '../../models/user';
import { UsersService } from '../services/users.service';
import { ProductsData } from '../../interfaces/product';
import { ProductTypesData } from '../../interfaces/product-type';
import { CurrenciesData } from '../../interfaces/currency';
import { InventoriesData } from '../../interfaces/inventory';
import { InventoryTransactionsData } from '../../interfaces/inventory-transaction';
import { ProductsService } from '../services/products.service';
import { ProductTypesService } from '../services/product-types.service';
import { CurrenciesService } from '../services/curriencies.service';
import { InventoriesService } from '../services/inventories.service';
import { InventoryTransactionsService } from '../services/inventory-transactions.service';


const API = [
  HttpService,
  // other backend apis go here

];

const SERVICES = [
  { provide: UsersData, useClass: UsersService },
  { provide: VendorsData, useClass: VendorsService },
  { provide: ProductsData, useClass: ProductsService },
  { provide: ProductTypesData, useClass: ProductTypesService },
  { provide: CurrenciesData, useClass: CurrenciesService },
  { provide: InventoriesData, useClass: InventoriesService },
  { provide: InventoryTransactionsData, useClass: InventoryTransactionsService },
  // other backend services & api go here
];


@NgModule({
  imports: [CommonModule, NbAuthModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders<CommonBackendModule> {
    return {
      ngModule: CommonBackendModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
