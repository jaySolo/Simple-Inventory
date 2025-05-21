/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { ServerDataSource } from 'ng2-smart-table';

@Injectable()
export class HttpService {

  get API_BASE_URL(): string {
    return environment.API_BASE_URL;
  }

  constructor(private readonly http: HttpClient) {}

  getServerDataSource(uri: string): DataSource {
    return new ServerDataSource(this.http, {
      endPoint: uri,
      dataKey: 'data',
      pagerPageKey: 'pagination[page]',
      pagerLimitKey: 'pagination[pageSize]',
      totalKey: 'meta.pagination.total',
      filterFieldKey: 'filters[#field#][$containsi]',
      sortFieldKey: 'sortFieldName',
      sortDirKey: 'sortDirection',
    });
  }

  get(endpoint: string, options?): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/${endpoint}`, options);
  }

  post(endpoint: string, data, options?): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/${endpoint}`, data, options);
  }

  put(endpoint: string, data, options?): Observable<any> {
    return this.http.put(`${this.API_BASE_URL}/${endpoint}`, data, options);
  }

  delete(endpoint: string, options?): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}/${endpoint}`, options);
  }
}
