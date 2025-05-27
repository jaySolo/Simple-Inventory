import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbListModule, NbProgressBarModule, NbSelectModule, NbSpinnerModule, NbTabsetModule } from "@nebular/theme";
import { BarcodeGeneratorAllModule } from "@syncfusion/ej2-angular-barcode-generator";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxEchartsModule } from "ngx-echarts";
import { TreeviewModule } from "ngx-treeview";
import { InventoriesRoutingModule } from "./inventories-routing.module";
import { InventoriesComponent } from "./inventories.component";
import { SharedInventoriesComponentsModule } from "../../shared/inventories/inventories.shared.module";

@NgModule({
    declarations: [
        InventoriesComponent,
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
        InventoriesRoutingModule,
        SharedInventoriesComponentsModule,
    ],
})
export class InventoriesModule { }