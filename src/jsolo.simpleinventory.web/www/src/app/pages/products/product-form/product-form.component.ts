import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { Product, ProductsData } from "../../../@core/interfaces/product";
import { ActivatedRoute, Router } from "@angular/router";
import { NbToastrService, NbDialogService, NbPopoverDirective } from "@nebular/theme";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { UsersData } from "../../../@core/models/user";
import { ValidateEvent } from "@syncfusion/ej2-angular-barcode-generator";
import { CurrenciesData, Currency } from "../../../@core/interfaces/currency";
import { ProductType, ProductTypesData } from "../../../@core/interfaces/product-type";
import { forkJoin, of } from "rxjs";
import { Observable } from "rxjs-compat";
import { map, startWith } from "rxjs/operators";

@Component({
    selector: 'ngx-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() isNewProduct: boolean = true;
    @Input() action: string = 'view';
    @Input() productData: Product = null;
    @Input() loading: boolean;

    @Input() triggerAction: EventEmitter<string>;

    @Output() Submit: EventEmitter<any> = new EventEmitter();
    @Output() Cancel: EventEmitter<any> = new EventEmitter();

    @ViewChild('classInput') classInput;
    @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

    get barcode(): string {
        return this.productBarcode ?? 'CLICK ME TO CHANGE BARCODE';
    };

    productBarcode: string;

    currencies: Currency[];
    productTypes: string[];
    filteredProductTypes$: Observable<string[]>;
    productTypeControl: UntypedFormControl = new UntypedFormControl('');

    submitting: boolean;

    productForm = new UntypedFormGroup({
        id: new UntypedFormControl(''),
        internalProductNumber: new UntypedFormControl(''),
        externalProductNumber: new UntypedFormControl(''),
        name: new UntypedFormControl(''),
        type: this.productTypeControl,
        make: new UntypedFormControl(''),
        priceValue: new UntypedFormControl(''),
        priceCurrency: new UntypedFormControl(''),
        description: new UntypedFormControl(''),
    });


    constructor(
        private currenciesApi: CurrenciesData,
        private productTypesApi: ProductTypesData,
        private dialog: NbDialogService,
    ) { }

    ngOnInit(): void {
        forkJoin({
            currencies: this.currenciesApi.listAll(),
            productTypes: this.productTypesApi.listAll(),
        }).subscribe(result => {
            this.currencies = result.currencies.items;
            this.productTypes = result.productTypes.items.map(i => i.name);

            this.filteredProductTypes$ = of(this.productTypes);
            this.filteredProductTypes$ = this.productTypeControl.valueChanges
                .pipe(startWith(''), map(filterString => this.filterProductTypes(filterString)))
        });

        this.submitting = false;

        if (!this.loading) {
            this.setForm(this.productData);
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
        if (changes['productData']) {
            this.setForm(changes['productData'].currentValue);
        }

        if (changes['action']) {
            // console.log(changes['action'])
            switch (changes['action'].currentValue) {
                case 'view':
                    this.productForm.disable()
                    break;

                default:
                    if (this.submitting) {
                        this.submitting = false;
                    }
                    this.productForm.enable()
                    break;
            }
        }
    }

    invalidBarcodeInput(args: ValidateEvent): void {
        // let error: HTMLElement = document.getElementById('errorblog');

        // this.canShowError = true;
        // let options = this.options()
        // let formobject =  new FormValidator('#form-element', options);
        //this.formObject.validate();
        // formobject.validate();
    }


    private filterProductTypes(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.productTypes.filter(pType => pType.toLowerCase().includes(filterValue));
    }


    setForm(formValue: Product) {
        if (formValue) {
            this.productForm.setValue({
                id: formValue?.id ?? '',
                internalProductNumber: formValue?.internalProductNumber ?? '',
                externalProductNumber: formValue?.externalProductNumber ?? '',
                name: formValue?.name ?? '',
                type: formValue?.type ?? '',
                make: formValue?.make ?? '',
                priceValue: formValue?.marketValue?.amount ?? '',
                priceCurrency: formValue?.marketValue?.currency?.code ?? '',
                description: formValue?.description ?? '',
            });

            this.productBarcode = formValue.barcode;
        }
    }


    openDialog() {
        // this.dialog.open().onClose.subscribe((result => {
        //     this.productBarcode = result;
        // }));
    }



    onSubmitClick(): void {
        this.submitting = true;
        this.productForm.disable();
        this.Submit.emit({
            value: {
                ...this.productForm.value,
                marketValue: {
                    amount: this.productForm.value.priceValue,
                    currency: this.currencies.find(c => c.code === this.productForm.value.priceCurrency),
                },
                barcode: this.productBarcode ?? null,
                suppliers: [],
            }
        });
    }


    cancelEditing(): void {
        this.setForm(this.productData);
        this.Cancel.emit({ value: this.isNewProduct });
    }
}