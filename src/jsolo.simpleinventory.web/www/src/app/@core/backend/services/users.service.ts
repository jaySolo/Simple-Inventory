/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersApi } from '../api/users.api';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';
import { switchMap, map } from 'rxjs/operators';
import { Contacts, RecentUsers, User, UsersData } from '../../models/user';
import { ChangeUserPassword } from '../../models/user-view-models';


@Injectable()
export class UsersService extends UsersData {

  constructor(
    private api: UsersApi,
    private authService: NbAuthService,
  ) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.usersDataSource;
  }


  getUsers(): Observable<User[]> {
    return of([]);
  }


  getContacts(): Observable<Contacts[]> {
    return of([]);
  }


  getRecentUsers(): Observable<RecentUsers[]> {
    return of([]);
  }


  list(pageNumber: number = 1, pageSize: number = 10): Observable<User[]> {
    return this.api.list(pageNumber, pageSize);
  }

  getCurrentUser(): Observable<User> {
    return this.authService.isAuthenticated()
      .pipe(
        switchMap(authenticated => {
          return authenticated ? this.api.getCurrent() : of(null);
        }),
        map(u => {
          if (u && !u.setting) {
            u.setting = {};
          }
          return u;
        }));
  }

  get(id: number): Observable<User> {
    return this.api.get(id);
  }

  create(user: any): Observable<User> {
    return this.api.add(user);
  }

  update(user: any): Observable<User> {
    return this.api.update(user);
  }

  updateCurrent(user: any): Observable<User> {
    return this.api.updateCurrent(user);
  }

  changeOwnPassword(passwords: ChangeUserPassword | any, userId: string | number): Observable<any> {
    return this.api.changeOwnPassword(passwords, userId);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }
}
