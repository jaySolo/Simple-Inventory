import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { UserRolesApi } from '../../../../@core/backend/api/user-roles.api';
import { UserRole } from '../../../../@core/models/user-role';
import { Permission } from '../../../../@core/models/permission';



@Component({
  selector: 'ngx-permissions-form',
  templateUrl: './permissions-form.component.html',
  styleUrls: ['./permissions-form.component.scss'],
})
export class PermissionsFormComponent implements OnInit {

  @Input() permission: Permission;
  @Input() standalone: boolean = false;
  @Input() canEdit: boolean;
  @Input() isDeleting: boolean = false;

  permissionForm: any;

  userRoles: UserRole[];

  selectedMethods: string[];


  constructor(
    private ref: NbDialogRef<PermissionsFormComponent>,
    private rolesApi: UserRolesApi,
  ) { }


  ngOnInit(): void {
    this.selectedMethods = this.permission?.acceptedMethods ?? [];
    this.permissionForm = new FormGroup({
      name: new FormControl({
        value: this.permission?.name ?? '',
        disabled: this.isDeleting,
      }, [Validators.required]),
      description: new FormControl({
        value: this.permission?.description ?? '',
        disabled: this.isDeleting,
      }),
      route: new FormControl({
        value: this.permission?.route,
        disabled: this.isDeleting,
      }, [Validators.required]),
      acceptedMethods: new FormControl({
        value: this.selectedMethods,
        disabled: this.isDeleting,
      }, []),
      adminPassword: new FormControl('', [Validators.required]),
    });
    this.rolesApi.list().subscribe((roles) => {
      this.userRoles = roles;
    });
    if (!this.canEdit) {
      this.permissionForm.disable();
    }
  }


  save(formData: any): void {
    this.ref.close({
      save: true,
      data: this.isDeleting ? {
        ...this.permission,
        adminPassword: formData.adminPassword,
      } : {
        name: formData.name,
        description: formData.description,
        route: formData.route,
        acceptedMethods: this.selectedMethods,
        roles: [],
        adminPassword: formData.adminPassword,
      }
    });
  }


  dismiss(): void {
    this.ref.close(null);
  }
}
