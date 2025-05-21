import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PermissionsFormComponent } from './permissions-form/permissions-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';

@NgModule({
  declarations: [
    PermissionsComponent,
    PermissionsListComponent,
    PermissionsFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSelectModule,
    Ng2SmartTableModule,
    PermissionsRoutingModule,
  ],
})
export class PermissionsModule { }
