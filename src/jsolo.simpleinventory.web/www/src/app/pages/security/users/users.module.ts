import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersFormComponent } from './users-form/users-form.component';
import { NbCardModule, NbDatepickerModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ListUsersComponent } from './list-users/list-users.component';


@NgModule({
  declarations: [
    AllUsersComponent,
    ListUsersComponent,
    ManageUserComponent,
    UsersFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbDatepickerModule,
    NbSelectModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    UsersRoutingModule,
  ],
})
export class UsersModule { }
