import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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
import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VendorsComponent,
    VendorDetailsComponent,
    VendorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    // LeafletModule.forRoot(),
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
    VendorsRoutingModule,
  ],
})
export class VendorsModule {}
