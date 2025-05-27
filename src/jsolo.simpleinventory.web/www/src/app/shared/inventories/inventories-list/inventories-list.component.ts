import { Component, Input, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { Inventory } from "../../../@core/interfaces/inventory";

@Component({
    selector: 'ngx-inventories-list',
    template: `
        <ng2-smart-table [source]="inventories" [settings]="config" 
                        (create)="createNewInventory()"
                        (edit)="updateInventory($event)"
                        (delete)="deleteInventory($event)"
                        (custom)="execCustomAction($event)">
        </ng2-smart-table>
    `,
})
export class InventoryListComponent implements OnInit {

    @Input() inventories: DataSource = new LocalDataSource();

    @Input() standAlone: boolean = true;

    @Input() canAdd: boolean = false;
    @Input() canEdit: boolean = false;
    @Input() canDelete: boolean = false;

    @Input() canView: boolean = false;

    @Input() canSelect: boolean = false;

    config: any;

    constructor() { }


    ngOnInit(): void {
        this.config = {
            mode: 'internal',
            pager: { perPage: 7 },
            columns: {
                'product.name': {
                    title: "Product Name",
                    valuePrepareFunction: (_, row: Inventory) => row.product?.name ?? '',
                },
                stockCount: {
                    title: 'Current Stock Count',
                },
                minimumStockCount: {
                    title: 'Minimum Required Stock',
                },
                minimumReorderQuantity: {
                    title: 'Minimum Reorder Quantity',
                }
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
                <i class="ion ion-clipboard m-0 p-0"
                    style="font-size:small" title="View Inventory History">
                </i>
                `,
                    },
                ] : [],
            },
            add: {
                addButtonContent:
                    '<i class="nb-plus d-none d-lg-block" title="Add Vendor"></i>',
                createButtonContent: 
                    '<i class="nb-checkmark d-none d-lg-block" title="Add Vendor"></i>',
                cancelButtonContent:
                    '<i class="nb-close d-none d-lg-block" title="Add Vendor"></i>',
            },
            edit: {
                editButtonContent:
                    '<i class="nb-edit d-none d-lg-block" title="Edit Vendor"></i>',
                saveButtonContent: 
                    '<i class="nb-checkmark d-none d-lg-block" title="Add Vendor"></i>',
                cancelButtonContent:
                    '<i class="nb-close d-none d-lg-block" title="Add Vendor"></i>',
                
            },
            delete: {
                deleteButtonContent:
                    '<i class="nb-trash d-none d-lg-block" title="Delete Vendor"></i>',
            },
        };
    }


    createNewInventory() {
        // this.router.navigateByUrl(`pages/inventories/new`);
    }


    updateInventory(event: { data: Inventory | any } | any) {
        // this.router.navigateByUrl(`pages/inventories/${event.data.id}/edit`);
    }


    deleteInventory(event: { data: Inventory | any } | any) {
        // this.router.navigateByUrl(`pages/inventories/${event.data.id}/delete`);
    }


    execCustomAction(event: { data: Inventory | any, action: string }): void {
        // this.router.navigateByUrl(`pages/inventories/${event.data.id}/${event.action}`);
    }
}
