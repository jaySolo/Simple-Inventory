import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsTableComponent } from './trips-table/trips-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [TripsTableComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  exports: [TripsTableComponent],
})
export class TablesSharedModule { }
