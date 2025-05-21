import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../common/http.service';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { UserRole } from '../../models/user-role';


@Injectable()
export class UserRolesApi {
  private readonly apiRoute: string = `roles`;

  get streetsDataSource(): DataSource {
    return this.api.getServerDataSource(`security/${this.apiRoute}`);
  }


  constructor(private api: HttpService) { }


  list(): Observable<UserRole[]> {
    return this.api.get(`security/${this.apiRoute}`);
  }


  details(name: string): Observable<UserRole[]> {
    return this.api.get(`security/${this.apiRoute}/${name}`);
  }


  add(role: UserRole): Observable<UserRole> {
    return this.api.post(`security/${this.apiRoute}`, role);
  }


  update(roleName: string, updatedRole: UserRole): Observable<UserRole> {
    return this.api.put(`security/${this.apiRoute}/${roleName}`, updatedRole);
  }


  delete(userRoleName: string, admPwrd: string): Observable<any> {
    return this.api.delete(`security/${this.apiRoute}/${userRoleName}?authorization=${admPwrd}`);
  }
}
