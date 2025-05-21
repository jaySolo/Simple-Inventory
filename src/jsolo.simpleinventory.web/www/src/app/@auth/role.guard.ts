/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbRoleProvider } from '@nebular/security';
import { ROLES } from './roles';

export const IsAuthorizedForAdminManagement = (role) => {
  const roles = role instanceof Array ? role : [role];
  return roles.some(x => x && x.toLowerCase() === ROLES.ADMIN);
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private roleProvider: NbRoleProvider) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.roleProvider.getRole()
      .pipe(map(IsAuthorizedForAdminManagement));
  }
}

// export const ATTENDANCE_MANAGER_ROLES = [
//   ROLES.ADMIN,
//   ROLES.ATTENDANCE_SHEET_MANAGER,
//   ROLES.CHANGE_FORM_REQUEST_SUBMITTER,
//   ROLES.CHANGE_FORM_REQUEST_REVIEWER
// ]

// export const IsAuthorizedForAttendanceManagement = (role) => {
//   const roles = role instanceof Array ? role : [role];
//   return roles.some(x => x && ATTENDANCE_MANAGER_ROLES.includes(x.toLowerCase()));

// }

// @Injectable()
// export class AttendanceSheetManagerGuard implements CanActivate {
//   constructor(private roleProvider: NbRoleProvider) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return this.roleProvider.getRole()
//       .pipe(map(IsAuthorizedForAttendanceManagement));
//   }
// }

// export const ATTENDANCE_SHEET_CREATE_ROLES = [
//   ROLES.ADMIN,
//   ROLES.ATTENDANCE_SHEET_MANAGER,
//   ROLES.CHANGE_FORM_REQUEST_SUBMITTER,
// ]

// export const IsAuthorizedForAttendanceCreate = (role) => {
//   const roles = role instanceof Array ? role : [role];
//   return roles.some(x => x && ATTENDANCE_SHEET_CREATE_ROLES.includes(x.toLowerCase()));
// }

// export const ATTENDANCE_SHEET_UPDATE_ROLES = [
//   ROLES.ADMIN,
//   ROLES.ATTENDANCE_SHEET_MANAGER,
//   ROLES.CHANGE_FORM_REQUEST_SUBMITTER,
// ]

// export const IsAuthorizedForAttendanceUpdate = (role) => {
//   const roles = role instanceof Array ? role : [role];
//   return roles.some(x => x && ATTENDANCE_SHEET_UPDATE_ROLES.includes(x.toLowerCase()));
// }

// export const CHANGE_FORM_SUBMISSION_ROLES = [
//   ROLES.ADMIN,
//   ROLES.CHANGE_FORM_REQUEST_SUBMITTER
// ]
// export const IsAuthorizedForChangeFormSubmission = (role) => {
//   const roles = role instanceof Array ? role : [role];
//   return roles.some(x => x && CHANGE_FORM_SUBMISSION_ROLES.includes(x.toLowerCase()));
// }

// @Injectable()
// export class ChangeFormSubmitterGuard implements CanActivate {
//   constructor(private roleProvider: NbRoleProvider) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return this.roleProvider.getRole()
//       .pipe(map(IsAuthorizedForChangeFormSubmission));
//   }
// }

// export const CHANGE_FORM_REVIEW_ROLES = [
//   ROLES.ADMIN,
//   ROLES.CHANGE_FORM_REQUEST_SUBMITTER,
//   ROLES.CHANGE_FORM_REQUEST_REVIEWER
// ]

// export const IsAuthorizedForChangeFormReview = (role) => {
//   const roles = role instanceof Array ? role : [role];
//   return roles.some(x => x && CHANGE_FORM_REVIEW_ROLES.includes(x.toLowerCase()));
// }

// @Injectable()
// export class ChangeFormReviewerGuard implements CanActivate {
//   constructor(private roleProvider: NbRoleProvider) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return this.roleProvider.getRole()
//       .pipe(map(IsAuthorizedForChangeFormReview));
//   }
// }

// const CHANGE_FORM_APPROVAL_ROLES = [
//   ROLES.ADMIN,
//   ROLES.CHANGE_FORM_REQUEST_REVIEWER
// ]

// export const IsAuthorizedForChangeFormApproval = (role) => {
//   const roles = role instanceof Array ? role : [role];
//   return roles.some(x => x && CHANGE_FORM_APPROVAL_ROLES.includes(x.toLowerCase()));
// }

// export const PLACEMENT_MANAGEMENT_ROLES = [
//   ROLES.ATTENDANCE_SHEET_MANAGER,
//   ROLES.ADMIN
// ]

// export const IsAuthorizedForPlacementManagement = (role) => {
//   const roles = role instanceof Array ? role : [role];
//   return roles.some(x => x && PLACEMENT_MANAGEMENT_ROLES.includes(x.toLowerCase()));
// }

// @Injectable()
// export class PlacementManagementGuard implements CanActivate {
//   constructor(private roleProvider: NbRoleProvider) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return this.roleProvider.getRole().
//       pipe(map(IsAuthorizedForPlacementManagement));
//   }
// }
