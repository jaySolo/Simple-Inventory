import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { UserRolesComponent } from './roles.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { UserRolesFormComponent } from './user-roles-form/user-roles-form.component';
import { UserRolesListComponent } from './roles-list/roles-list.component';


@NgModule({
  declarations: [
    UserRolesComponent,
    UserRolesListComponent,
    UserRolesFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbSelectModule,
    NbToggleModule,
    Ng2SmartTableModule,
    RolesRoutingModule,
    ReactiveFormsModule,
  ],
})
export class RolesModule { }
