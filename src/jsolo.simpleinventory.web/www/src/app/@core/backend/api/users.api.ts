/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { HttpService } from '../common/http.service';
import { User } from '../../models/user';
import { ChangeUserPassword } from '../../models/user-view-models';


@Injectable()
export class UsersApi {
  private readonly apiRoute: string = 'users';

  constructor(private api: HttpService) { }

  get usersDataSource(): DataSource {
    return this.api.getServerDataSource(`security/${this.api.apiUrl}/${this.apiRoute}`);
  }

  // list(): Observable<User[]> {
  //   return this.api.get(`security/${this.apiRoute}`);
  // }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<any[]> {
    const params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`);

    return this.api.get(`security/${this.apiRoute}`, { params })
      .pipe(map(data => data.map(item => {
        const picture = `security/${this.api.apiUrl}/${this.apiRoute}/${item.id}/photo`;
        return { ...item, picture };
      })));
  }

  getCurrent(): Observable<any> {
    return this.api.get(`${this.apiRoute}/current`)
      .pipe(map(data => {
        const picture = '../../../../../assets/images/user-icon.png';
        // const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data, picture };
      }));
  }

  get(id: number): Observable<any> {
    return this.api.get(`security/${this.apiRoute}/${id}`)
      .pipe(map(data => {
        const picture = `security/${this.api.apiUrl}/${this.apiRoute}/${data.id}/photo`;
        return { ...data, picture };
      }));
  }

  details(userNameOrId: any): Observable<User> {
    return this.api.get(`security/${this.apiRoute}/${userNameOrId}`);
  }

  // add(user: EditableUser): Observable<{ message: string, data: User }> {
  //   console.log(user);
  //   return this.api.post(`security/${this.apiRoute}`, user);
  // }

  add(item: any): Observable<any> {
    return this.api.post(`security/${this.apiRoute}`, item);
  }

  updateCurrent(item: any): Observable<any> {
    return this.api.put(`security/${this.apiRoute}/current`, item);
  }

  update(item: any): Observable<any> {
    return this.api.put(`security/${this.apiRoute}/${item.id}`, item);
  }

  changeOwnPassword(keys: ChangeUserPassword | any, userId: string | number): Observable<any> {
    return this.api.put(`security/${this.apiRoute}/${userId}/Change-Password`, keys);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(`security/${this.apiRoute}/${id}`);
  }
}
