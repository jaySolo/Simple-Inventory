import { Component, EventEmitter, OnInit, TemplateRef } from "@angular/core";
import { Vendor, VendorsData } from "../../../@core/interfaces/vendor";
import { ActivatedRoute, Router } from "@angular/router";
import { NbToastrService, NbDialogService, NbGlobalLogicalPosition } from "@nebular/theme";
import { UsersData } from "../../../@core/models/user";

@Component({
    selector: 'ngx-vendor-details',
    templateUrl: './vendor-details.component.html',
    styleUrls: ['./vendor-details.component.scss'],
})
export class VendorDetailsComponent implements OnInit {

    thisVendorId: any;
    action: any;

    get isNewVendor(): boolean {
        return (
            this.thisVendorId === null || this.thisVendorId === undefined
        ) || (
            this.action?.includes('create') || this.action?.includes('add') || this.action?.includes('new')
        ) === true;
    }

    get isEditable(): boolean {
        return this.isNewVendor || (
            this.action?.includes('edit') || this.action?.includes('update')
        ) === true;
    }

    thisVendor: Vendor | any;

    get thisVendorDisplayName(): string {
        return this.thisVendorId === null || this.thisVendorId === undefined ? '' : (
            this.thisVendor?.businessName ?? `${this.thisVendor.contactTitle} ${this.thisVendor.contactFirstName} ${this.thisVendor.contactLastName}`
        );
    }

    dialogRef: any = null;

    loading: boolean = true;

    formActive: boolean = true;

    actionEmitter: EventEmitter<string> = new EventEmitter();


    constructor(
        private api: VendorsData,
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
        this.thisVendorId = this.uri.snapshot?.paramMap?.get('id') ?? null;

        this.action = this.uri.snapshot?.paramMap?.get('action') ?? null;
    }


    fetchData() {
        if (this.isNewVendor !== true) {
            this.api.get(this.thisVendorId).subscribe((vendorData) => {
                this.thisVendor = vendorData;
                // this.mattersDataSrc.empty().then(() => {
                //     this.mattersDataSrc.load(this.thisVendor.matters);
                // });
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
        const me = await this.userApi.getCurrentUser().toPromise();

        const oldAction = this.action;
        this.action = 'view';

        if (this.isNewVendor === true) {

            this.api.create({
                ...event.value,
                id: -1,
                creator: me,
                createdOn: new Date(),
            }).subscribe((result) => {
                // this.thisVendor = result;
                // this.isEditable = false;
                // this.isNewVendor = false;
                this.toast.success(null, 'Vendor created successfully', {
                    icon: 'plus',
                    limit: 3,
                    position: NbGlobalLogicalPosition.TOP_END,
                });
                // console.log(result);
                setTimeout(() => {
                    this.router.navigateByUrl('pages/vendors');
                }, 1750);
            }, (errRes) => {
                // console.error(errRes.error);
                this.toast.danger(errRes.error.error.message, 'Failed to create Vendor!',
                    {
                        icon: 'plus',
                        limit: 3,
                        position: NbGlobalLogicalPosition.TOP_END,
                    });
                this.action = oldAction;
            })
        } else {
            this.api.update({
                ...this.thisVendor,
                ...event.value,
                lastUpdater: me,
                lastUpdatedOn: new Date()
            }).subscribe((result) => {
                // this.thisVendor = result;
                // this.isEditable = false;
                this.toast.success(null, 'Vendor updated successfully',
                    {
                        icon: 'edit',
                        limit: 3,
                        position: NbGlobalLogicalPosition.TOP_END,
                    });
                setTimeout(() => {
                    this.router.navigateByUrl('pages/vendors');
                }, 1750);

            }, (errRes) => {
                this.toast.danger(errRes.error.error.message, 'Failed to update Vendor!',
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
        if (this.isNewVendor === true) {
            this.toast.warning('You cancelled the task.', 'Creating Vendor Aborted',
                {
                    icon: 'plus',
                    limit: 3,
                    position: NbGlobalLogicalPosition.TOP_END,
                });
            this.router.navigateByUrl('pages/vendors');
        } else {
            // this.isEditable = false;
            this.toast.warning('You cancelled the task.', 'Updating Vendor\'s Information Aborted',
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
        this.dialogRef.onClose.subscribe((deleteVendor) => {
            if (deleteVendor === true) {
                this.api.delete(this.thisVendorId).subscribe((result) => {
                    this.toast.success(null, 'Vendor deleted successfully',
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
                this.toast.warning('You cancelled the task.', 'Deleting Vendor Aborted',
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


    deleteThisVendor(): void {
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