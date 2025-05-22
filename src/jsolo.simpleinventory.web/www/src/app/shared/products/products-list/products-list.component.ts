import { Component, Input, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { Product } from "../../../@core/interfaces/product";
import { Router } from "@angular/router";

@Component({
    selector: 'ngx-products-list',
    template:  `
        <ng2-smart-table [source]="products" [settings]="config" 
                        (create)="createNewProduct()"
                        (edit)="updateProduct($event)"
                        (delete)="deleteProduct($event)"
                        (custom)="execCustomAction($event)">
        </ng2-smart-table>
    `
})
export class ProductsListComponent implements OnInit {

    @Input() products: DataSource = new LocalDataSource();
    @Input() standAlone: boolean = true;

    @Input() canAdd: boolean = false;
    @Input() canEdit: boolean = false;
    @Input() canDelete: boolean = false;

    @Input() canView: boolean = false;

    @Input() canSelect: boolean = false;

    config: any;


    constructor(private router: Router) { }


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
                internalProductNumber: {
                    title: 'Internal Product Number'
                },
                externalProductNumber: {
                    title: 'External Product Number'
                },
                name: {
                    title: 'Product Name'
                },
                type: {
                    title: 'Product Type'
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
