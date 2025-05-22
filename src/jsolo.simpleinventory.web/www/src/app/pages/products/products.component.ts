import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsData } from '../../@core/interfaces/product';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Component({
    selector: 'ngx-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

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
                valuePrepareFunction: (_: any, row: Product | any) => `${row.contactTitle} ${row.contactFirstName} ${row.contactLastName}`
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
                style="font-size:small" title="View Product's Details">
              </i>
            `,
                },
            ],
        },
        add: {
            addButtonContent:
                '<i class="nb-plus d-none d-lg-block" title="Add Product"></i>',
        },
        edit: {
            editButtonContent:
                '<i class="nb-edit d-none d-lg-block" title="Edit Product"></i>',
        },
        delete: {
            deleteButtonContent:
                '<i class="nb-trash d-none d-lg-block" title="Delete Product"></i>',
        },
    }

    count: Number = 0;

    loading: boolean = true;


    constructor(private router: Router, private api: ProductsData) { }


    ngOnInit(): void {
        this.data = this.api.gridDataSource;

        this.data?.onChanged().subscribe((_) => {
            this.count = this.data.count()
            this.loading = false;
        }, (e) => {
            // console.log(e)
        }, () => { });
    }


    createNewProduct() {
        this.router.navigateByUrl(`pages/products/new`);
    }


    updateProduct(event: { data: Product | any } | any) {
        this.router.navigateByUrl(`pages/products/${event.data.id}/edit`);
    }


    deleteProduct(event: { data: Product | any } | any) {
        this.router.navigateByUrl(`pages/products/${event.data.id}/delete`);
    }

    execCustomAction(event: { data: Product | any, action: string }): void {
        this.router.navigateByUrl(`pages/products/${event.data.id}/${event.action}`);
    }
}
