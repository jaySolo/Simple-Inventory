import { Component, OnInit } from "@angular/core";
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { UserRolesApi } from '../../../../@core/backend/api/user-roles.api';
import { UserRole } from '../../../../@core/models/user-role';
import { FormResult } from '../../../../@core/models/form-result';
import { Permission } from '../../../../@core/models/permission';
import { UserRolesFormComponent } from '../user-roles-form/user-roles-form.component';



@Component({
  selector: 'ngx-user-roles-list',
  template: `
        <ng2-smart-table [settings]="config" [source]="userRoles"
                    (create)="onCreateRole($event)"
                    (edit)="onUpdateRole($event)"
                    (delete)="onDeleteRole($event)"
                    (custom)="onCustomAction($event)">
        </ng2-smart-table>
    `,
  styleUrls: ['./roles-list.component.scss'],
})
export class UserRolesListComponent implements OnInit {

  config: any;

  userRoles = new LocalDataSource();


  constructor(
    private api: UserRolesApi,
    private dialog: NbDialogService,
    private toastr: NbToastrService,
  ) { }


  ngOnInit(): void {
    this.config = {
      mode: 'external',
      pager: { perPage: 10 },
      // hideSubHeader: true,
      actions: {
        position: 'right',
        add: true,     // TODO: replace with user service method 'hasPermission(create-parish)'
        edit: true,    // TODO: replace with user service method 'hasPermission(update-parish)'
        delete: true, // TODO: replace with user service method 'hasPermission(delete-parish)'
        custom: [
          {
            name: 'details',
            title: `
                <i class="ion ion-ios-information-outline m-0 p-0"
                  style="font-size:small" title="View Details">
                </i>
              `,
          },
        ],
      },
      add: {
        addButtonContent: '<i class="nb-plus" title="Create new Parish"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit d-none d-lg-block" title="Edit Parish"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash d-none d-lg-block" title="Delete Parish"></i>',
        confirmDelete: true,
      },
      columns: {
        index: {
          title: '#',
          filter: false,
          valuePrepareFunction: (value: any, row: UserRole, cell: any) => {
            return 1 + cell.dataSet.data.indexOf(row);
          },
        },
        name: { title: 'Name', type: 'string' },
        description: { title: 'Description', type: 'String' },
        userCount: { title: 'No. of Users with Role', },
        permissions: {
          title: 'No. of Permissions',
          valuePrepareFunction: (value: any, row: UserRole, cell: any) => {
            return row.permissions.length;
          },
          filterFunction: (row: Permission[] | any[], value: string) => {
            console.log(row, value);
            row.forEach(permission => {
              let permName = (permission?.name ?? '').toLowerCase();
              if (permName.includes(value.toLowerCase())) {
                return true;
              }
            });
            return false;
          },
        },
      }
    };

    this.reloadRoles();
  }


  reloadRoles(): void {
    this.api.list().subscribe((roles: UserRole[]) => {
      this.userRoles.empty().then(() => {
        this.userRoles.load(roles);
      });
    });
  }


  onCreateRole(_event_: any): void {
    this.dialog.open(UserRolesFormComponent, {
      context: { role: null, canEdit: true, standalone: true },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe((result: FormResult) => {
      if (result?.save && result?.data) {
        console.log(result);
        this.api.add(result.data).subscribe(
          (_userRole_: any) => {
            this.toastr.success('', 'Added permission successfully!', {
              icon: 'plus-outline',
            });
            this.reloadRoles();
          },
          (error: any) => {
            this.toastr.danger(error.statusText, 'Failed to Add permission!', {
              icon: 'plus-outline',
            });
          }
        );
      } else {
        this.toastr.warning(
          'You closed the form without saving',
          'Adding User Role Cancelled',
          { icon: 'plus-outline' },
        );
      }
    });
  }


  onUpdateRole(event: any): void {
    this.dialog.open(UserRolesFormComponent, {
      context: { role: event.data, canEdit: true, standalone: true },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe((result: FormResult) => {
      if (result?.save && result?.data) {
        this.api.update(event.data.name, result.data).subscribe(
          (_userRole_: any) => {
            this.toastr.success('', 'Updated user role successfully!', {
              icon: 'edit-2-outline',
            });
            this.reloadRoles();
          },
          (error: any) => {
            this.toastr.danger(error.error.message, 'Failed to update user role!', {
              icon: 'edit-2-outline',
            });
          }
        );
      } else {
        this.toastr.warning(
          'You closed the form without saving',
          'Updating User Role Cancelled',
          { icon: 'edit-2-outline' },
        );
      }
    });
  }


  onDeleteRole(event: any): void {
    this.dialog.open(UserRolesFormComponent, {
      context: {
        role: event.data,
        canEdit: false,
        standalone: true,
        isDeleting: true,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe((result: FormResult) => {
      if (result?.save && result?.data) {
        this.api.delete(event.data.name, result.data.adminPassword).subscribe(
          (__: any) => {
            this.toastr.success('', 'Deleted user role successfully!', {
              icon: 'trash-2-outline',
            });
            this.reloadRoles();
          },
          (error) => {
            console.log(error);
            this.toastr.danger(error.error.message, 'Failed to user role!', {
              icon: 'trash-2-outline',
            });
          }
        )
      } else {
        this.toastr.warning(
          'You closed the form without saving',
          'Deleting User Role Cancelled',
          { icon: 'trash-2-outline' },
        );
      }
    });
  }


  onCustomAction(event: any): void {
    switch (event.action) {
      case 'details': default:
        this.dialog.open(UserRolesFormComponent, {
          context: { role: event.data, canEdit: false, standalone: true },
          closeOnBackdropClick: false,
          closeOnEsc: false,
        });
        break;
    }
  }
}
