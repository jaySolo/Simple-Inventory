import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { Observable } from "rxjs";
import { User } from "./users";
import { UserPermission } from "./user-permission";

export class UserRole {
  id?: string;
  name: string;
  description?: string;
  type?: string;
  permissions?: UserPermission[] | string[];
  users?: User[];
}

export abstract class UserRoleData {
  abstract get gridDataSource(): DataSource;
  abstract listAll(): Promise<any>;
  abstract list(pageNumber: number, pageSize: number): Observable<UserRole[]>;
  abstract get(id: number): Observable<UserRole>;
  abstract update(role: UserRole): Observable<UserRole>;
  abstract create(role: UserRole): Observable<UserRole>;
  abstract delete(id: number): Observable<boolean>;
}
