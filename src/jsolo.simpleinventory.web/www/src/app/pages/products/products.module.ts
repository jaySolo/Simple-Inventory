import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme';
import { TreeviewModule } from 'ngx-treeview';
import { NgxEchartsModule } from 'ngx-echarts';
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { BarcodeGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { SharedProductsComponentsModule } from '../../shared/products/products.shared.module';
import { SharedVendorsComponentsModule } from '../../shared/vendors/vendors.shared.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BarcodeGeneratorAllModule,
    // LeafletModule.forRoot(),
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbProgressBarModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTabsetModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    TreeviewModule,
    ProductsRoutingModule,
    SharedProductsComponentsModule,
    SharedVendorsComponentsModule,
  ],
})
export class ProductsModule {}
