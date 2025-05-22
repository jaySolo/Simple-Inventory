import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbAuthModule } from '@nebular/auth';

import { HttpService } from './http.service';
import { VendorsData } from '../../interfaces/vendor';
import { VendorsService } from '../services/vendors.service';
import { UsersData } from '../../models/user';
import { UsersService } from '../services/users.service';


const API = [
  HttpService,
  // other backend apis go here

];

const SERVICES = [
  { provide: UsersData, useClass: UsersService },
  { provide: VendorsData, useClass: VendorsService },
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
