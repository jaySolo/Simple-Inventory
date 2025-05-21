import { Injectable } from '@angular/core';
import { UserPermission, UserPermissionData } from '../interfaces/common/user-permission';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Observable } from 'rxjs';
import { UserPermissionsApi } from '../api/permissions.api';
import { map } from 'rxjs/operators';

@Injectable()
export class UserPermissionsService extends UserPermissionData {

  constructor(private api: UserPermissionsApi) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.permissionsDataSource;
  }

  listAll(): Promise<any> {
    return this.api.listAll().pipe(map((result: any) => {

      let permissions: UserPermission[] = [];
      let index = 1;
      for(var p in result.permissions) {
        for (var c in result.permissions[p].controllers) {
          for (var a in result.permissions[p].controllers[c])
          {
            permissions.push({
              id: (index++).toString(),
              type: `${a} ${c}`,
              controller: c,
              action: a,
              enabled: result.permissions[p].controllers[c][a].enabled,
              policy: result.permissions[p].controllers[c][a].policy,
            });
          }
        }
      }
      return permissions;
    })).toPromise();
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<UserPermission[]> {
    return this.api.list(pageNumber, pageSize);
  }

  get(id: number): Observable<UserPermission> {
    return this.api.get(id);
  }
}
