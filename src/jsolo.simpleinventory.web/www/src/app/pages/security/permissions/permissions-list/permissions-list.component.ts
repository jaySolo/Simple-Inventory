import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { PermissionsApi } from '../../../../@core/backend/api/permissions.api';
import { FormResult } from '../../../../@core/models/form-result';
import { Permission } from '../../../../@core/models/permission';
import { PermissionsFormComponent } from '../permissions-form/permissions-form.component';



@Component({
  selector: 'ngx-permissions-list',
  template: `
        <ng2-smart-table [settings]="config"
                         [source]="permissions"
                         (create)="onCreatePermission($event)"
                         (edit)="onUpdatePermission($event)"
                         (delete)="onDeletePermission($event)"
                         (custom)="onCustomAction($event)">
        </ng2-smart-table>
    `,
})
export class PermissionsListComponent implements OnInit {

  permissions: LocalDataSource = new LocalDataSource();

  config: any;


  constructor(
    private dialog: NbDialogService,
    private toastr: NbToastrService,
    private api: PermissionsApi,
  ) { }


  ngOnInit(): void {
    this.config = {
      mode: 'external',
      pager: { perPage: 10 },
      // hideSubHeader: true,
      actions: {
        position: 'right',
        add: !true,     // disabled on purpose
        edit: !true,    // disabled on purpose
        delete: !true,  // disabled on purpose
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
          valuePrepareFunction: (_value_: any, row: Permission, cell: any) => {
            return 1 + cell.dataSet.data.indexOf(row);
          },
        },
        name: { title: 'Name', type: 'string' },
        description: { title: 'Description', type: 'String' },
        route: { title: 'Route', type: 'String' },
        acceptedMethods: { title: 'Allowed Request Methods' },
        roles: {
          title: 'No. of Assigned Roles',
          valuePrepareFunction: (_value_: any, row: Permission, cell: any) => {
            return row.roles.length;
          },
        },
      },
    };

    this.reloadPermissions();
  }


  reloadPermissions(): void {
    this.api.list().subscribe(permissions => {
      this.permissions.empty().then(() => {
        this.permissions.load(permissions);
      });
    });
  }


  onCreatePermission(__: any): void {
    this.dialog.open(PermissionsFormComponent, {
      context: { permission: null, canEdit: true, standalone: true },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe((result: FormResult) => {
      if (result?.save && result?.data) {
        this.api.add(result.data).subscribe(
          (_permission_: any) => {
            this.toastr.success('', 'Added permission successfully!', {
              icon: 'plus-outline',
            });
            // this.permissions.add(permission);  // permission has issues
            this.reloadPermissions();
          },
          (error: any) => {
            this.toastr.danger(error.statusText, 'Failed to Add permission!', {
              icon: 'plus-outline',
            });
          }
        );
      } else {
        this.toastr.warning(
          'You closed the form without saving.',
          'Adding Permission Cancelled',
          { icon: 'plus-outline' },
        );
      }
    });
  }


  onUpdatePermission(event: any): void {
    this.dialog.open(PermissionsFormComponent, {
      context: { permission: event.data, canEdit: true, standalone: true },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe((result: FormResult) => {
      if (result?.save && result?.data) {
        this.api.update(event.data.name, result.data).subscribe(
          (_permission_: any) => {
            this.toastr.success('', 'Updated permission successfully!', {
              icon: 'edit-2-outline',
            });
            this.reloadPermissions();
          },
          (error: any) => {
            this.toastr.danger(error.error.message, 'Failed to update permission!', {
              icon: 'edit-2-outline',
            });
          }
        );
      } else {
        this.toastr.warning(
          'You closed the form without saving.',
          'Updating Permission Cancelled',
          { icon: 'edit-2-outline' },
        );
      }
    });
  }


  onDeletePermission(event: any): void {
    this.dialog.open(PermissionsFormComponent, {
      context: {
        permission: event.data,
        canEdit: false,
        standalone: true,
        isDeleting: true,
      },
    }).onClose.subscribe((result: FormResult) => {
      if (result?.save && result?.data) {
        this.api.delete(event.data.name, result.data.adminPassword).subscribe(
          (___: any) => {
            this.toastr.success('', 'Deleted permission successfully!', {
              icon: 'trash-2-outline',
            });
            this.reloadPermissions();
          },
          (error: any) => {
            // console.log(error);
            this.toastr.danger(error.error.message, 'Failed to delete permission!', {
              icon: 'trash-2-outline',
            });
          }
        );
      } else {
        this.toastr.warning(
          'You closed the form without saving.',
          'Deleting Permission Cancelled',
          { icon: 'trash-2-outline' },
        );
      }
    });
  }


  onCustomAction(event: any): void {
    switch (event.action) {
      case 'details': default:
        this.dialog.open(PermissionsFormComponent, {
          context: { permission: event.data, canEdit: false, standalone: true },
          closeOnBackdropClick: false,
          closeOnEsc: false,
        });
        break;
    }
  }
}
