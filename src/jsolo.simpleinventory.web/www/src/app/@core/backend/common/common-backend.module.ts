import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbAuthModule } from '@nebular/auth';

import { HttpService } from './http.service';
import { VendorsData } from '../../interfaces/vendor';
import { VendorService } from '../services/vendors.service';


const API = [
  HttpService,
  // other backend apis go here

];

const SERVICES = [
  { provide: VendorsData, useClass: VendorService },
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
