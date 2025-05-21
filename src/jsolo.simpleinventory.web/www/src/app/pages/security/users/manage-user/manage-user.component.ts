import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { UserRolesApi } from '../../../../@core/backend/api/user-roles.api';
import { User } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  @Input() user: User;

  changePasswordForm: any;

  changeRoleForm: any;

  userRoles: any;


  constructor(
    private ref: NbDialogRef<ManageUserComponent>,
    private rolesApi: UserRolesApi,
  ) { }


  ngOnInit(): void {
    this.rolesApi.list().subscribe((roles) => {
      this.userRoles = roles;
    });

    this.changePasswordForm = new FormGroup({
      newUserPassword: new FormControl('', [Validators.required]),
      confirmUserPassword: new FormControl('', [Validators.required]),
      adminPassword: new FormControl('', [Validators.required]),
    });

    this.changeRoleForm = new FormGroup({
      roles: new FormControl(this.user?.userRoles ?? [], [Validators.required]),
      adminPassword: new FormControl('', [Validators.required]),
    });
  }


  changeUserRole(formData: any): void {
    this.ref.close({
      save: true,
      action: 'change-role',
      data: formData,
    });
  }


  changeUserPassword(formData: any): void {

    this.ref.close({
      save: true,
      action: 'change-password',
      data: formData,
    });
  }


  dismiss(): void {
    this.ref.close(null);
  }
}
