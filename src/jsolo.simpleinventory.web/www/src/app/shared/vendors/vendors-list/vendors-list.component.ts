import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { Vendor } from "../../../@core/interfaces/vendor";
import { LocalDataSource } from "ng2-smart-table";

@Component({
    selector: 'ngx-vendors-list',
    template: `
        <ng2-smart-table [source]="vendors" [settings]="config" 
                        (create)="createNewVendor()"
                        (edit)="updateVendor($event)"
                        (delete)="deleteVendor($event)"
                        (custom)="execCustomAction($event)">
        </ng2-smart-table>
    `,
    styleUrls: [ './vendors-list.component.scss' ],
})
export class VendorsListComponent implements OnInit {
    @Input() vendors: DataSource = new LocalDataSource();
    @Input() standAlone: boolean = true;

    @Input() canAdd: boolean = false;
    @Input() canEdit: boolean = false;
    @Input() canDelete: boolean = false;

    @Input() canView: boolean = false;

    @Input() canSelect: boolean = false;

    
    config: any;


    constructor(private readonly router: Router) { }

    ngOnInit(): void {
        this.config = {
            mode: 'external',
            pager: { perPage: 7 },
            columns: {
                id: {
                    title: '#',
                    width: '105px',
                    filter: false,
                },
                businessName: {
                    title: 'Business Name'
                },
                contactPerson: {
                    title: 'Name of Contact',
                    valuePrepareFunction: (_: any, row: Vendor | any) => `${row.contactTitle} ${row.contactFirstName} ${row.contactLastName}`
                },
                contactTelephone: {
                    title: 'Telephone #',
                },
                contactMobile: {
                    title: 'Mobile Phone #',
                },
                address: {
                    title: 'Address',
                    filter: false,
                    sort: false,
                },
            },
            actions: {
                // title: 'Actions',
                position: "right",
                add: this.canAdd,
                delete: this.canDelete,
                edit: this.canEdit,
                custom: this.canView ? [
                    {
                        name: 'view',
                        title: `
                <i class="ion ion-ios-information-outline m-0 p-0"
                    style="font-size:small" title="View Vendor's Details">
                </i>
                `,
                    },
                ] : [],
            },
            add: {
                addButtonContent:
                    '<i class="nb-plus d-none d-lg-block" title="Add Vendor"></i>',
            },
            edit: {
                editButtonContent:
                    '<i class="nb-edit d-none d-lg-block" title="Edit Vendor"></i>',
            },
            delete: {
                deleteButtonContent:
                    '<i class="nb-trash d-none d-lg-block" title="Delete Vendor"></i>',
            },
        };
    }


    createNewVendor() {
        this.router.navigateByUrl(`pages/vendors/new`);
    }


    updateVendor(event: { data: Vendor | any } | any) {
        this.router.navigateByUrl(`pages/vendors/${event.data.id}/edit`);
    }


    deleteVendor(event: { data: Vendor | any } | any) {
        this.router.navigateByUrl(`pages/vendors/${event.data.id}/delete`);
    }

    
    execCustomAction(event: { data: Vendor | any, action: string }): void {
        this.router.navigateByUrl(`pages/vendors/${event.data.id}/${event.action}`);
    }
}