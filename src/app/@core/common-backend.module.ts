import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NbAuthModule } from '@nebular/auth';
import { UserPermissionsApi } from './api/permissions.api';
import { UserRolesApi } from './api/roles.api';
import { SettingsApi } from './api/settings.api';
import { UsersApi } from './api/users.api';
import { SmartTableQueryInterceptor } from './services/common/smart-table-query-interceptor';
import { UserData } from '../@core/interfaces/common/users';
import { SettingsData } from './interfaces/common/settings';
import { HttpService } from './services/common/http.service';
import { SettingsService } from './services/settings.service';
import { UsersService } from './services/users.service';



const API_AND_SERVICES = [
  HttpService,
  UsersApi,
  UserRolesApi,
  UserPermissionsApi,
  SettingsApi,
  // other backend services & api go here
];


const SERVICES_WITH_ABSTRACT_CLASS = [
  // services with abstract classes go here
  { provide: UserData, useClass: UsersService },
  { provide: SettingsData, useClass: SettingsService },
];


@NgModule({
  imports: [CommonModule, NbAuthModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders<CommonBackendModule> {
    return {
      ngModule: CommonBackendModule,
      providers: [
        ...API_AND_SERVICES,
        ...SERVICES_WITH_ABSTRACT_CLASS,
        { provide: HTTP_INTERCEPTORS, useClass: SmartTableQueryInterceptor, multi: true },
      ],
    };
  }
}
