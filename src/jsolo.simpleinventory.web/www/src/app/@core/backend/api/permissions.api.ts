import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../common/http.service';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Permission } from '../../models/permission';


@Injectable()
export class PermissionsApi {
  private readonly apiRoute: string = `permissions`;

  get streetsDataSource(): DataSource {
    return this.api.getServerDataSource(`security/${this.apiRoute}`);
  }


  constructor(private api: HttpService) { }


  list(): Observable<Permission[]> {
    return this.api.get(`security/${this.apiRoute}`);
  }


  details(name: string): Observable<Permission[]> {
    return this.api.get(`security/${this.apiRoute}/${name}`);
  }


  add(permission: Permission): Observable<Permission> {
    return this.api.post(`security/${this.apiRoute}`, permission);
  }


  update(permissionName: string, updatedPermission: Permission): Observable<Permission> {
    return this.api.put(`security/${this.apiRoute}/${permissionName}`, updatedPermission);
  }


  delete(permissionName: string, admPwrd: string): Observable<any> {
    return this.api.delete(`security/${this.apiRoute}/${permissionName}?authorization=${admPwrd}`);
  }
}
