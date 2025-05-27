import { Routes, RouterModule } from "@angular/router";
import { InventoriesComponent } from "./inventories.component";


const routes: Routes = [
  {
    path: '',
    component: InventoriesComponent,
  },
];

export const InventoriesRoutingModule = RouterModule.forChild(routes);
