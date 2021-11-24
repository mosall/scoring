import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiPmeRoutingModule } from './ci-pme-routing.module';
import { CiPmeComponent } from './ci-pme.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IdentificationComponent} from "./identification/identification.component";
import {EligibiliteComponent} from "./eligibilite/eligibilite.component";
import {QualitatifComponent} from "./qualitatif/qualitatif.component";
import { IndicateursComponent } from './indicateurs/indicateurs.component';
import {HttpClientModule} from "@angular/common/http";
import { AccueilComponent } from './accueil/accueil.component';


@NgModule({
  declarations: [
    CiPmeComponent,
    IdentificationComponent,
    EligibiliteComponent,
    QualitatifComponent,
    IndicateursComponent,
    AccueilComponent
  ],
  imports: [
    CommonModule,
    CiPmeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CiPmeModule { }
