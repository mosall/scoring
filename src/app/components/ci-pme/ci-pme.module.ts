import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiPmeRoutingModule } from './ci-pme-routing.module';
import { CiPmeComponent } from './ci-pme.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CiPmeComponent,
  ],
  imports: [
    CommonModule,
    CiPmeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CiPmeModule { }
