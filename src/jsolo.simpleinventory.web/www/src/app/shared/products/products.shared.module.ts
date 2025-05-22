import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductsListComponent } from './products-list/products-list.component';



@NgModule({
  declarations: [
    ProductsListComponent,
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  exports: [
    ProductsListComponent,
  ],
})
export class SharedProductsComponentsModule { }
