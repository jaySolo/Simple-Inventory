import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { Observable } from "rxjs";

export class UserPermission {
  id:	string;
  type: string;
  controller: string;
  action: string;
  enabled: boolean;
  policy?: string;
  role?: string;
  created_by?: string;
  updated_by?: string;
}

export abstract class UserPermissionData {
  abstract get gridDataSource(): DataSource;
  abstract listAll(): Promise<any>;
  abstract list(pageNumber: number, pageSize: number): Observable<UserPermission[]>;
  abstract get(id: number): Observable<UserPermission>;
}
