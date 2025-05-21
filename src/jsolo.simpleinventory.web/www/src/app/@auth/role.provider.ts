/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbAuthService, NbAuthOAuth2JWTToken, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserStore } from '../@core/stores/user.store';
import { InitUserService } from '../@theme/services/init-user.service';

@Injectable()
export class RoleProvider extends NbRoleProvider {

  constructor(
    private authService: NbAuthService,
    private userStore: UserStore,
    private userInit: InitUserService,
  ) {
    super();
  }

  getLowerCaseRoles(roles: any): string | string[] {
    if (Array.isArray(roles)) {
      roles = roles.map(element => {
        return element.toLowerCase();
      });
    } else {
      roles = roles.toLowerCase();
    }
    return roles;
  }

  getRole(): Observable<string | string[]> {
    // return this.authService.getToken()
    //   .pipe(
    //     map((token: NbAuthJWTToken) => {
    //       // const payload = token.getValue();
    //       const payload = token.getPayload();
    //       console.log(payload, token);
    //       return !!(token.isValid() && payload && payload['role']) ? this.getLowerCaseRoles(payload['role']) : 'guest';
    //     }),
    //   );

    if (!this.userStore.getUser()) {
      return this.userInit.initCurrentUser()
        .pipe(map(user => this.returnRoleFromUser(user)))
    }
    else {
      return new Observable(subscriber => {
        let roles =  this.returnRoleFromUser(this.userStore.getUser())
        subscriber.next(roles);
     });
    }
  }

  returnRoleFromUser(user){
    const payload = user;
    let res = (payload && payload['role'] && payload['role']['name']) ?
      this.getLowerCaseRoles(payload['role']['name']) : 'guest';
    return res;
  }
}


