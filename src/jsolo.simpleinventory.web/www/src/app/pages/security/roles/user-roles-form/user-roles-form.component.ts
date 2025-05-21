import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { PermissionsApi } from '../../../../@core/backend/api/permissions.api';
import { UserRole } from '../../../../@core/models/user-role';
import { Permission } from '../../../../@core/models/permission';



@Component({
  selector: 'ngx-user-roles-form',
  templateUrl: './user-roles-form.component.html',
  styleUrls: ['./user-roles-form.component.scss'],
})
export class UserRolesFormComponent implements OnInit {

  @Input() role: UserRole;
  @Input() standalone: boolean = false;
  @Input() canEdit: boolean;
  @Input() isDeleting: boolean = false;

  userRoleForm: any;

  permissions: Permission[];

  selectedPermissions = [];

  constructor(
    private ref: NbDialogRef<UserRolesFormComponent>,
    private permissionsApi: PermissionsApi,
  ) { }


  ngOnInit(): void {
    this.selectedPermissions = this.role?.permissions ?? [];

    this.userRoleForm = new FormGroup({
      name: new FormControl({
        value: this.role?.name ?? '',
        disabled: this.isDeleting,
      }, [Validators.required]),
      description: new FormControl({
        value: this.role?.description ?? '',
        disabled: this.isDeleting,
      }),
      permissions: new FormControl(this.selectedPermissions),
      hasAdminRights: new FormControl({
        value: this.role?.hasAdminRights ?? false,
        disabled: this.isDeleting,
      }),
      adminPassword: new FormControl('', [Validators.required]),
    });

    this.permissionsApi.list().subscribe((permissions) => {
      this.permissions = permissions;
    });

    if (this.canEdit !== true && !this.isDeleting) {
      this.userRoleForm.disable();
    }
  }

  save(formData: any): void {
    this.ref.close({
      save: true,
      data: this.isDeleting ? {
        ...this.role,
        adminPassword: formData.adminPassword
      } : formData,
    });
  }


  dismiss(): void {
    this.ref.close(null);
  }
}
