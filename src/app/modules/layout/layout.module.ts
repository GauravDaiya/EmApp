import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ViewEmployeeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
