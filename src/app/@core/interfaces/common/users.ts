/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Settings } from './settings';
// import { Address } from './address';
import { UserRole } from './user-role';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  name?: string;
  // age: number;
  picture: string;
  // address: Address;
  settings?: Settings;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  role?: UserRole;
  status?: string;
  departments?: any[];
  password_expired?: boolean;
  created_attn_sheets?: any[];
  requested_cfrs?: any[]
  approved_cfr?: any[];
  rejected_cfr?: any[];
}

export abstract class UserData {
  abstract get gridDataSource(): DataSource;
  abstract getCurrentUser(): Observable<User>;
  abstract listAll(): Promise<User[]>;
  abstract list(pageNumber: number, pageSize: number): Observable<User[]>;
  abstract get(id: number): Observable<User>;
  abstract update(user: User): Observable<User>;
  abstract updateCurrent(user: User): Observable<User>;
  abstract changeCurrentPassword(newPasswords: any): Observable<any>;
  abstract create(user: User): Observable<User>;
  abstract delete(id: number): Observable<boolean>;
}
