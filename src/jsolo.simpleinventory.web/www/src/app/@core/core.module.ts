import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { NbAuthModule } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { CommonBackendModule } from './backend/common/common-backend.module';
// import { UsersApi } from './backend/api/users.api';
// import { UserRolesApi } from './backend/api/user-roles.api';
// import { PermissionsApi } from './backend/api/permissions.api';
// import { UsersService } from './backend/services/users.service';

import { UsersData } from './models/user';
import { UserStore } from './stores/user.store';

import { InitUserService } from '../@theme/services/init-user.service';

import {
  AnalyticsService,
  LayoutService,
  SeoService,
  StateService,
} from './utils';

// import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
// import { of as observableOf } from 'rxjs';

// import { UserData } from './interfaces/common/users';
// import { SmartTableData } from './data/smart-table';

// import { UserStore } from './stores/user.store';
// import { InitUserService } from '../@theme/services/init-user.service';
// import { SettingsService } from './services/settings.service';
// import { CommonBackendModule } from './common-backend.module';
// import { UsersService } from './services/users.service';


const DATA_APIS = [
  // { provide: PermissionsApi },
  // { provide: UserRolesApi },
  // { provide: UsersApi },
];

const DATA_SERVICES = [
  // { provide: UserData, useClass: UsersService },
  // { provide: SmartTableData, useClass: SmartTableDataService },
];

export const NB_CORE_PROVIDERS = [
  ...CommonBackendModule.forRoot().providers,
  ...DATA_APIS,
  ...DATA_SERVICES,

  AnalyticsService,
  LayoutService,
  SeoService,
  StateService,
];


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,


        // { provide: UsersData, useClass: UsersService },
        // { provide: UsersService },

        UserStore,

        InitUserService,

        // SettingsService,
      ],
    };
  }
}
