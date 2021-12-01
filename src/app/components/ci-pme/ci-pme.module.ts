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
import { ChartsModule } from 'ng2-charts';
import { AccueilComponent } from './accueil/accueil.component';
import { LisPmeComponent } from './list-pme/lis-pme.component';


@NgModule({
  declarations: [
    CiPmeComponent,
    IdentificationComponent,
    EligibiliteComponent,
    QualitatifComponent,
    IndicateursComponent,
    AccueilComponent,
    LisPmeComponent
  ],
  imports: [
    CommonModule,
    CiPmeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,

  ]
})
export class CiPmeModule { }
