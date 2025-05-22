import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { VendorsListComponent } from './vendors-list/vendors-list.component';



@NgModule({
  declarations: [
    VendorsListComponent,
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  exports: [
    VendorsListComponent,
  ],
})
export class SharedVendorsComponentsModule { }
