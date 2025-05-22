import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { Vendor, VendorsData } from "../../../@core/interfaces/vendor";
import { ActivatedRoute, Router } from "@angular/router";
import { NbToastrService, NbDialogService, NbPopoverDirective } from "@nebular/theme";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { UsersData } from "../../../@core/models/user";

@Component({
    selector: 'ngx-vendor-form',
    templateUrl: './vendor-form.component.html',
    styleUrls: ['./vendor-form.component.scss'],
})
export class VendorFormComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() isNewVendor: boolean = true;
    @Input() action: string = 'view';
    @Input() vendorData: Vendor = null;
    @Input() loading: boolean;

    @Input() triggerAction: EventEmitter<string>;

    @Output() Submit: EventEmitter<any> = new EventEmitter();
    @Output() Cancel: EventEmitter<any> = new EventEmitter();

    @ViewChild('classInput') classInput;
    @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

    submitting: boolean;

    vendorForm = new UntypedFormGroup({
        id: new UntypedFormControl(''),
        businessName: new UntypedFormControl(''),
        contactTitle: new UntypedFormControl(''),
        contactLastName: new UntypedFormControl(''),
        contactFirstName: new UntypedFormControl(''),
        contactMobile: new UntypedFormControl(''),
        contactTelephone: new UntypedFormControl(''),
        contactFax: new UntypedFormControl(''),
        contactEmail: new UntypedFormControl(''),
        address: new UntypedFormControl(''),
    });


    constructor(private api: VendorsData, private usersApi: UsersData) {

    }

    ngOnInit(): void {
        this.submitting = false;

        if (!this.loading) {
            this.setForm(this.vendorData);
        }

        setTimeout(this.popover?.show, 4500);
    }


    ngAfterViewInit(): void {
        this.triggerAction.subscribe((action: string) => {
            switch (action) {
                case 'submit':
                    this.onSubmitClick();
                    break;

                case 'cancel':
                    this.cancelEditing();
                    break;

                default:
                    break;
            }
        });
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['vendorData']) {
            this.setForm(changes['vendorData'].currentValue);
        }

        if (changes['action']) {
            // console.log(changes['action'])
            switch (changes['action'].currentValue) {
                case 'view':
                    this.vendorForm.disable()
                    break;

                default:
                    if (this.submitting) {
                        this.submitting = false;
                    }
                    this.vendorForm.enable()
                    break;
            }
        }
    }


    setForm(formValue: Vendor) {
        if (formValue) {
            this.vendorForm.setValue({
                id: formValue?.id ?? '',
                businessName: formValue?.businessName ?? '',
                contactTitle: formValue?.contactTitle ?? '',
                contactLastName: formValue?.contactLastName ?? '',
                contactFirstName: formValue?.contactFirstName ?? '',
                contactMobile: formValue?.contactMobile ?? '',
                contactTelephone: formValue?.contactTelephone ?? '',
                contactFax: formValue?.contactFax ?? '',
                contactEmail: formValue?.contactEmail ?? '',
                address: formValue?.address ?? '',

            });
        }
    }



  onSubmitClick(): void {
    this.submitting = true;
    this.vendorForm.disable();
    this.Submit.emit({ value: {
      ...this.vendorForm.value,
    //   class: this.selectedClass,
    //   vendors: this.selectedVendors,
    } });
  }


  cancelEditing(): void {
    this.setForm(this.vendorData);
    this.Cancel.emit({ value: this.isNewVendor });
  }
}