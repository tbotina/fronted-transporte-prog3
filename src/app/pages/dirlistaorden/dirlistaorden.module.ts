import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirlistaordenRoutingModule } from './dirlistaorden-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    DirlistaordenRoutingModule
  ]
})
export class DirlistaordenModule { }
