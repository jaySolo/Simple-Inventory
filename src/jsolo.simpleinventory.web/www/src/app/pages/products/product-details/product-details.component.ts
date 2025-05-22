import { Component, EventEmitter, OnInit, TemplateRef } from "@angular/core";
import { Product, ProductsData } from "../../../@core/interfaces/product";
import { ActivatedRoute, Router } from "@angular/router";
import { NbToastrService, NbDialogService, NbGlobalLogicalPosition } from "@nebular/theme";
import { UsersData } from "../../../@core/models/user";

@Component({
    selector: 'ngx-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

    thisProductId: any;
    action: any;

    get isNewProduct(): boolean {
        return (
            this.thisProductId === null || this.thisProductId === undefined
        ) || (
            this.action?.includes('create') || this.action?.includes('add') || this.action?.includes('new')
        ) === true;
    }

    get isEditable(): boolean {
        return this.isNewProduct || (
            this.action?.includes('edit') || this.action?.includes('update')
        ) === true;
    }

    thisProduct: Product | any;

    dialogRef: any = null;

    loading: boolean = true;

    formActive: boolean = true;

    actionEmitter: EventEmitter<string> = new EventEmitter();


    constructor(
        private api: ProductsData,
        private userApi: UsersData,
        private uri: ActivatedRoute,
        private router: Router,
        private toast: NbToastrService,
        private dialog: NbDialogService,
    ) {
        this.initIdAndAction();
    }


    ngOnInit(): void {
        this.fetchData();
    }


    initIdAndAction() {
        this.thisProductId = this.uri.snapshot?.paramMap?.get('id') ?? null;

        this.action = this.uri.snapshot?.paramMap?.get('action') ?? null;
    }


    fetchData() {
        if (this.isNewProduct !== true) {
            this.api.get(this.thisProductId).subscribe((productData) => {
                this.thisProduct = productData;
                
                this.toggleLoadingAnimation();
            });
        } else {
            this.toggleLoadingAnimation();
        }
    }


    toggleLoadingAnimation() {
        this.loading = true;
        setTimeout(() => this.loading = false, 1500);
    }


    async onFormSubmit(event: any) {
        // console.log(event);
        // return;
        const me = await this.userApi.getCurrentUser().toPromise();

        const oldAction = this.action;
        this.action = 'view';

        if (this.isNewProduct === true) {

            this.api.create({
                ...event.value,
                id: -1,
                creator: me,
                createdOn: new Date(),
            }).subscribe((result) => {
                // this.thisProduct = result;
                // this.isEditable = false;
                // this.isNewProduct = false;
                this.toast.success(null, 'Product created successfully', {
                    icon: 'plus',
                    limit: 3,
                    position: NbGlobalLogicalPosition.TOP_END,
                });
                // console.log(result);
                setTimeout(() => {
                    this.router.navigateByUrl('pages/products');
                }, 1750);
            }, (errRes) => {
                // console.error(errRes.error);
                this.toast.danger(errRes.error.error.message, 'Failed to create Product!',
                    {
                        icon: 'plus',
                        limit: 3,
                        position: NbGlobalLogicalPosition.TOP_END,
                    });
                this.action = oldAction;
            })
        } else {
            this.api.update({
                ...this.thisProduct,
                ...event.value,
                lastUpdater: me,
                lastUpdatedOn: new Date()
            }).subscribe((result) => {
                // this.thisProduct = result;
                // this.isEditable = false;
                this.toast.success(null, 'Product updated successfully',
                    {
                        icon: 'edit',
                        limit: 3,
                        position: NbGlobalLogicalPosition.TOP_END,
                    });
                setTimeout(() => {
                    this.router.navigateByUrl('pages/products');
                }, 1750);

            }, (errRes) => {
                this.toast.danger(errRes.error.error.message, 'Failed to update Product!',
                    {
                        icon: 'edit',
                        limit: 3,
                        position: NbGlobalLogicalPosition.TOP_END,
                    });
                this.action = oldAction;
            })
        }
        // this.isEditable = false;
    }


    onFormCancel(): void {
        if (this.isNewProduct === true) {
            this.toast.warning('You cancelled the task.', 'Creating Product Aborted',
                {
                    icon: 'plus',
                    limit: 3,
                    position: NbGlobalLogicalPosition.TOP_END,
                });
            this.router.navigateByUrl('pages/products');
        } else {
            // this.isEditable = false;
            this.toast.warning('You cancelled the task.', 'Updating Product\'s Information Aborted',
                {
                    icon: 'edit',
                    limit: 3,
                    position: NbGlobalLogicalPosition.TOP_END,
                });
            this.action = 'view'
        }
    }


    spawnDelDialog(dialogTemplate: TemplateRef<any>): void {
        this.dialogRef = this.dialog.open(dialogTemplate);
        this.dialogRef.onClose.subscribe((deleteProduct) => {
            if (deleteProduct === true) {
                this.api.delete(this.thisProductId).subscribe((result) => {
                    this.toast.success(null, 'Product deleted successfully',
                        {
                            icon: 'trash',
                            limit: 3,
                            position: NbGlobalLogicalPosition.TOP_END,
                        });
                    this.router.navigateByUrl('pages/contacts');
                }, (errRes) => {
                    this.toast.danger(errRes.error.error.message, 'Failed to delete contact!',
                        {
                            icon: 'trash',
                            limit: 3,
                            position: NbGlobalLogicalPosition.TOP_END,
                        });
                });
            } else {
                this.toast.warning('You cancelled the task.', 'Deleting Product Aborted',
                    {
                        icon: 'trash',
                        limit: 3,
                        position: NbGlobalLogicalPosition.TOP_END,
                    });
            }
        });
    }


    dismissDialog(): void {
        if (this.dialogRef) {
            this.dialogRef.close(false);
            this.dialogRef = null;
        }
    }


    onTriggerSubmit(): void {
        this.actionEmitter.next('submit');
    }


    onTriggerCancel(): void {
        this.actionEmitter.next('cancel');
    }


    enableForm() {
        // this.isEditable = true;
        this.action = 'edit';
        this.formActive = true;
        // this.mattersActive = this.docsActive = this.notesActive = false;
    }


    deleteThisProduct(): void {
        if (this.dialogRef) {
            this.dialogRef.close(true);
            this.dialogRef = null;
        }
    }


    back(): boolean {
        this.router.navigateByUrl('pages/contacts');
        return false;
    }

}