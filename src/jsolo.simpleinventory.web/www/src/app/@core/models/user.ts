import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Observable } from 'rxjs';
import { Permission } from './permission';
import { Settings } from './settings';
import { ChangeUserPassword } from './user-view-models';


export interface User {
  id: number;
  username: string;
  userRoles: string[];
  firstName: string;
  lastName: string;
  position: string;
  emailAddress: string;
  isEmailConfirmed?: boolean;
  phoneNumber?: string;
  isPhoneConfirmed?: boolean;
  createdOn?: Date;
  lastUpdatedOn?: Date;
  name?: string;
  age?: number;
  login?: string;
  picture?: string;
  // address?: Address;
  settings?: Settings;

  birthday?: Date;
  canBeLockedOut?: boolean;
  isLocked?: boolean;

  isAdministrator?: boolean;

  permissions?: Permission[];
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}



export abstract class UsersData {

  abstract get gridDataSource(): DataSource;

  abstract getCurrentUser(): Observable<User>;
  abstract getUsers(): Observable<User[]>;
  abstract getContacts(): Observable<Contacts[]>;
  abstract getRecentUsers(): Observable<RecentUsers[]>;

  abstract list(pageNumber?: number, pageSize?: number): Observable<User[]>;
  abstract get(id: number): Observable<User>;
  abstract update(user: User): Observable<User>;
  abstract updateCurrent(user: User): Observable<User>;
  abstract changeOwnPassword(passwords: ChangeUserPassword | any, userId: string | number): Observable<any>;
  abstract create(user: User): Observable<User>;
  abstract delete(id: number): Observable<boolean>;
}
