import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InventoryListComponent } from './inventories-list/inventories-list.component';



@NgModule({
  declarations: [
    InventoryListComponent,
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  exports: [
    InventoryListComponent,
  ],
})
export class SharedInventoriesComponentsModule { }
