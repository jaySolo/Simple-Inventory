/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../services/common/http.service';
// import { map } from 'rxjs/operators';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { ServerDataSource } from 'ng2-smart-table';

@Injectable()
export class UserPermissionsApi {
  private readonly apiController: string = 'users-permissions/permissions';

  constructor(private api: HttpService) {}

  get permissionsDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.API_BASE_URL}/${this.apiController}`);
  }

  listAll(): Observable<any[]> {
    return this.api.get(this.apiController);
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<any[]> {
    const params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`);

    return this.api.get(this.apiController, { params })
      // .pipe(map(data => data.map(item => {
      //   const picture = `${this.api.API_BASE_URL}/${this.apiController}/${item.id}/photo`;
      //   return { ...item, picture };
      // })));
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      // .pipe(map(data => {
      //   const picture = `${this.api.API_BASE_URL}/${this.apiController}/${data.id}/photo`;
      //   return { ...data, picture };
      // }));
  }
}
