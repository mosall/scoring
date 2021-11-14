import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiPmeRoutingModule } from './ci-pme-routing.module';
import { CiPmeComponent } from './ci-pme.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IdentificationComponent} from "./identification/identification.component";
import {EligibiliteComponent} from "./eligibilite/eligibilite.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {QualitatifComponent} from "./qualitatif/qualitatif.component";


@NgModule({
  declarations: [
    CiPmeComponent,
    IdentificationComponent,
    EligibiliteComponent,
    AccueilComponent,
    QualitatifComponent
  ],
  imports: [
    CommonModule,
    CiPmeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CiPmeModule { }
