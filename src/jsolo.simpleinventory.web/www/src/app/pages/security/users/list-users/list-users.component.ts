import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { FormResult } from '../../../../@core/models/form-result';
import { User, UsersData } from '../../../../@core/models/user';
import { ManageUserComponent } from '../manage-user/manage-user.component';
import { UsersFormComponent } from '../users-form/users-form.component';



@Component({
  selector: 'ngx-list-users',
  template: `
    <ng2-smart-table [settings]="config" [source]="users"
                     (create)="onCreateUser($event)"
                     (edit)="onUpdateUser($event)"
                     (delete)="onDeleteUser($event)"
                     (custom)="onCustomAction($event)">
    </ng2-smart-table>
  `,
})
export class ListUsersComponent implements OnInit {

  config: any;

  users = new LocalDataSource();


  constructor(
    private api: UsersData,
    private dialog: NbDialogService,
    private toastr: NbToastrService,
  ) { }


  ngOnInit(): void {
    this.config = {
      mode: 'external',
      pager: { perPage: 5 },
      actions: {
        add: true,     // TODO: replace with user service method 'hasPermission(create-user)'
        edit: true,    // TODO: replace with user service method 'hasPermission(update-user)'
        delete: true,  // TODO: replace with user service method 'hasPermission(delete-user)'
        custom: [
          {
            name: 'details',
            title: `
              <i class="ion ion-ios-information-outline m-0 p-0"
                style="font-size:small" title="View Report Details">
              </i>
            `,
          }
        ],
        position: 'right',
      },
      add: {
        addButtonContent: '<i class="nb-plus" title="Create new Report"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit d-none d-lg-block" title="Edit Report"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash d-none d-lg-block" title="Delete Report"></i>',
      },
      columns: {
        avatar: {
          title: '',
          type: 'html',
          filter: false,
          sort: false,
          valuePrepareFunction: (_cell_, row: User) => `
            <img src="../../.././../../assets/images/user-icon.png"
                 width="48" height="48" class="rounded-circle mr-1"/>
          `,
        },
        id: { title: 'User ID', type: 'string' },
        username: { title: 'Username' },
        firstName: { title: 'First Name', type: 'String' },
        lastName: { title: 'Last Name', type: 'String' },
        emailAddress: { title: 'E-mail Address' },
      }
    };
    this.reloadUsers();
  }


  reloadUsers(): void {
    this.api.list().subscribe((users: User[]) => {
      this.users.empty().then(() => {
        this.users.load(users);
      });
    });
  }


  onCreateUser(event: any): void {
    this.dialog.open(UsersFormComponent, {
      context: { user: null, standalone: true, canEdit: true },
      // dialogClass: 'w-75',
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe((result: FormResult) => {
      // console.log(result.action, result.user);
      if (result?.save && result?.data) {
        this.api.create(result.data).subscribe((newUser) => {
          this.api.list().subscribe((users: User[]) => {
            this.users.empty().then(() => {
              this.users.load(users);
            });
          });
          this.toastr.show(
            `User '${newUser.username}' was successfully updated.`,
            'Created User', {
            icon: { icon: 'plus-outline' },
            status: 'success',
            limit: 3, position: NbGlobalLogicalPosition.TOP_END,
          });
        }, (error) => {
          this.toastr.show(
            'Failed to create a new user.',
            'Create User Failure', {
            icon: { icon: 'plus-outline' },
            status: 'danger',
            limit: 3, position: NbGlobalLogicalPosition.TOP_END,
          });
        });
      } else {
        this.toastr.show(
          'You closed the form without saving.',
          'Creating User Cancelled',
          {
            icon: { icon: 'plus-outline' },
            status: 'warning',
            limit: 3, position: NbGlobalLogicalPosition.TOP_END,
          }
        );
      }
    }, (_error_: any) => {
      this.toastr.show(
        'Failed to create a new user.',
        'Create User Failure', {
        icon: { icon: 'plus-outline' },
        status: 'danger',
        limit: 3, position: NbGlobalLogicalPosition.TOP_END,
      });
    });
  }


  onUpdateUser(event: any): void {
    this.dialog.open(ManageUserComponent, {
      context: { user: event.data }, // standalone: true, canEdit: true },
      // dialogClass: 'w-75',
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe((result: FormResult) => {
      if (result?.data && result?.save && result?.action) {
        switch (result.action) {
          case 'edit':
            console.log('updating user profile', result.data);
            this.api.update({ ...event.data, ...result.data }).subscribe((updatedUser) => {
              this.api.list().subscribe((users: User[]) => {
                this.users.empty().then(() => {
                  this.users.load(users);
                });
              });
              this.toastr.show(
                `User '${updatedUser.username}' was successfully updated.`,
                'Updated User', {
                icon: { icon: 'plus-outline' },
                status: 'success',
                limit: 3, position: NbGlobalLogicalPosition.TOP_END,
              });
            }, (error) => {
              this.toastr.show(
                'Failed to update user\'s profile.',
                'Update User Failure', {
                icon: { icon: 'plus-outline' },
                status: 'danger',
                limit: 3, position: NbGlobalLogicalPosition.TOP_END,
              });
            });
            break;
          case 'change-password':
            this.api.changeOwnPassword({
              newPassword: result.data.newUserPassword,
              confirmPassword: result.data.confirmUserPassword,
              adminPassword: result.data.adminPassword,
            }, event.data.id).subscribe((changedUsrPwd) => {
              this.toastr.show(
                `Password of user '${event.data.username}' were successfully changed.`,
                'Updated User\'s Password', {
                icon: { icon: 'plus-outline' },
                status: 'success',
                limit: 3, position: NbGlobalLogicalPosition.TOP_END,
              });
            }, (error) => {
              this.toastr.show(
                'Failed to change user\'s password.',
                'Update User\'s Password Failure', {
                icon: { icon: 'plus-outline' },
                status: 'danger',
                limit: 3, position: NbGlobalLogicalPosition.TOP_END,
              });
            });

            console.log('changing user password', result.data, event.data.id)
            //TODO: change user password as admin
            break;
          case 'change-role':
            this.api.update({
              ...event.data,
              ...result.data,
              userRoles: result.data.roles,
            }).subscribe((updatedUser) => {
              this.api.list().subscribe((users: User[]) => {
                this.users.empty().then(() => {
                  this.users.load(users);
                });
              });
              this.toastr.show(
                `Roles of user '${updatedUser.username}' were successfully changed.`,
                'Updated User\'s Roles', {
                icon: { icon: 'plus-outline' },
                status: 'success',
                limit: 3, position: NbGlobalLogicalPosition.TOP_END,
              });
            }, (error) => {
              this.toastr.show(
                'Failed to change user\'s role.',
                'Update User\'s Roles Failure', {
                icon: { icon: 'plus-outline' },
                status: 'danger',
                limit: 3, position: NbGlobalLogicalPosition.TOP_END,
              });
            });
            break;
          default: break;
        }
      } else {
        this.toastr.show(
          'You closed the form without saving.',
          'Managing User Cancelled', {
          icon: { icon: 'plus-outline' },
          status: 'warning',
          limit: 3, position: NbGlobalLogicalPosition.TOP_END,
        });
      }
    });
    // .onClose.subscribe((result: { action, user, adminPassword }) => {
    //   // console.log(action, user, adminPassword);
    //   if (result && result.user) {
    //     // UsersComponent.DataSrc.add(user); // replace with save user via api logic
    //     // event.source.add(user); // replace with save user via api logic
    //     this.toastr.show(
    //       `User '${result.user.username}' was successfully updated.`,
    //       'Created User', {
    //       icon: { icon: 'edit', pack: 'eva' },
    //       status: 'success',
    //       limit: 3, position: NbGlobalLogicalPosition.TOP_END,
    //     });
    //   } else {
    //     this.toastr.show(
    //       'You closed the form without saving',
    //       'Updating User Cancelled',
    //       {
    //         icon: { icon: 'edit', pack: 'eva' },
    //         status: 'warning',
    //         limit: 3, position: NbGlobalLogicalPosition.TOP_END,
    //       }
    //     );
    //   }
    // }, (error) => {
    //   this.toastr.show(
    //     'Failed to update a new user.',
    //     'Update User Failure', {
    //     icon: { icon: 'edit', pack: 'eva' },
    //     status: 'danger',
    //     limit: 3, position: NbGlobalLogicalPosition.TOP_END,
    //   });
    // });
  }


  onDeleteUser(event: any): void {
    this.dialog.open(UsersFormComponent, {
      context: {
        user: event.data,
        standalone: true,
        canEdit: false,
        isDeleting: true,
      },
      // dialogClass: 'w-75',
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe((result: FormResult) => {
      // console.log(result.action, result.user);
      if (result?.data && result?.save) {
      } else {
        this.toastr.show(
          'You closed the form without saving.',
          'Deleting User Cancelled',
          {
            icon: { icon: 'plus-outline' },
            status: 'warning',
            limit: 3,
            position: NbGlobalLogicalPosition.TOP_END,
          }
        );
      }
    });
  }


  onCustomAction(event: any): void {
    switch (event.action) {
      case 'details':
        this.dialog.open(UsersFormComponent, {
          context: { user: event.data, canEdit: false, standalone: true, },
          // dialogClass: 'w-75',
        });
        break;
      default: break;
    }
  }
}
