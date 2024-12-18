import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuotasRoutingModule } from './cuotas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CuotasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CuotasModule { }
