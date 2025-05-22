import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor, VendorsData } from '../../@core/interfaces/vendor';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Component({
    selector: 'ngx-vendors',
    templateUrl: './vendors.component.html',
    styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {

    data: DataSource;
    
    config = {
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
            // add: false,
            // delete: false,
            // edit: false,
            custom: [
                {
                    name: 'view',
                    title: `
              <i class="ion ion-ios-information-outline m-0 p-0"
                style="font-size:small" title="View Vendor's Details">
              </i>
            `,
                },
            ],
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
    }

    count: Number = 0;

    loading: boolean = true;


    constructor(private router: Router, private api: VendorsData) { }


    ngOnInit(): void {
        this.data = this.api.gridDataSource;

        this.data?.onChanged().subscribe((_) => {
            this.count = this.data.count()
            this.loading = false;
        }, (e) => {
            // console.log(e)
        }, () => { });
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
