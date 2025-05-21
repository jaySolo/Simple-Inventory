import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbSelectComponent } from '@nebular/theme';
import { UserRolesApi } from '../../../../@core/backend/api/user-roles.api';
import { UserRole } from '../../../../@core/models/user-role';
import { User } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  @Input() user: User;
  @Input() standalone: boolean = false;
  @Input() canEdit: boolean;
  @Input() isDeleting: boolean = false;

  userForm: any;
  @Input() userRoles: UserRole[];

  compStyles: string = '';
  compClasses: string = '';
  // userDateOfBirth: string = ''

  @ViewChild(NbSelectComponent) rolesSelectComp: NbSelectComponent;

  constructor(
    private ref: NbDialogRef<UsersFormComponent>,
    private rolesApi: UserRolesApi,
  ) { }

  ngOnInit(): void {

    console.log(this.user, 'standalone', this.standalone, 'deleting', this.isDeleting);

    this.compClasses = `mb-0 pb-0${this.standalone ? '' : ' rounded'}`;

    this.userForm = new FormGroup({
      firstName: new FormControl({
        value: this.user?.firstName ?? '',
        disabled: !this.canEdit,
      }, [Validators.required]),
      lastName: new FormControl({
        value: this.user?.lastName ?? '',
        disabled: !this.canEdit,
      }, [Validators.required]),
      email: new FormControl({
        value: this.user?.emailAddress ?? '',
        disabled: !this.canEdit,
      }, [Validators.required]),
      phone: new FormControl({
        value: this.user?.phoneNumber ?? '',
        disabled: !this.canEdit,
      }, []),
      birthday: new FormControl({
        value: this.user?.birthday ? new Date(this.user?.birthday) : null,
        disabled: !this.canEdit,
      }, []),
      position: new FormControl({
        value: this.user?.position ?? '',
        disabled: !this.canEdit,
      }, []),
      userName: new FormControl({
        value: this?.user?.username ?? '',
        disabled: !this.canEdit,
      }, [Validators.required]),
      userPassword: new FormControl({
        value: '',
        disabled: !this.canEdit,
      }, []),
      confirmUserPassword: new FormControl({
        value: '',
        disabled: !this.canEdit,
      }, []),
      adminPassword: new FormControl('', [Validators.required]),
    });

    this.rolesApi.list().subscribe((roles) => {
      this.userRoles = roles;
    });

    if (!this.canEdit && !this.isDeleting) {
      this.userForm.disable();
    }
  }


  saveUserProfile(formData: any): void {
    // console.log(formData)
    this.ref.close({
      save: true,
      action: this.user ? (this.isDeleting ? 'delete' : 'edit') : 'create',
      data: {
        // ...this.user,
        ...formData,
        // id: -1,
        emailAddress: formData.email,
        phoneNumber: formData.phone,
        password: formData.userPassword,
        confirmPassword: formData.confirmUserPassword,
      },
      user: {
        ...formData,
        // id: -1,
        emailAddress: formData.email,
        phoneNumber: formData.phone,
        password: formData.userPassword,
        confirmPassword: formData.confirmUserPassword,
      },
    });
  }


  dismiss(): void {
    this.ref.close(null);
  }
}
