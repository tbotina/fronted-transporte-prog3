import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonaNaturalRoutingModule } from './persona-natural-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    PersonaNaturalRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class PersonaNaturalModule { }
