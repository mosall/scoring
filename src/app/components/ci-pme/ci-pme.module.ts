import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiPmeRoutingModule } from './ci-pme-routing.module';
import { CiPmeComponent } from './ci-pme.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IdentificationComponent} from "./identification/identification.component";
import {EligibiliteComponent} from "./eligibilite/eligibilite.component";
import {QualitatifComponent} from "./qualitatif/qualitatif.component";
import { IndicateursComponent } from './indicateurs/indicateurs.component';
import { ChartsModule } from 'ng2-charts';
import { AccueilComponent } from './accueil/accueil.component';
import { LisPmeComponent } from './list-pme/lis-pme.component';
import {NgxCurrencyModule} from "ngx-currency";
import {MatCurrencyFormatModule} from "mat-currency-format";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { RadarComponent } from './radar/radar.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AccompagnementComponent } from './accompagnement/accompagnement.component';
import { DemandeClotureeComponent } from './demande-cloturee/demande-cloturee.component';
import { DetailsDemandeComponent } from './details-demande/details-demande.component';

@NgModule({
  declarations: [
    CiPmeComponent,
    IdentificationComponent,
    EligibiliteComponent,
    QualitatifComponent,
    IndicateursComponent,
    AccueilComponent,
    LisPmeComponent,
    RadarComponent,
    AccompagnementComponent,
    DemandeClotureeComponent,
    DetailsDemandeComponent
  ],
    imports: [
        CommonModule,
        CiPmeRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ChartsModule,
        NgxCurrencyModule,
        MatCurrencyFormatModule,
        NgMultiSelectDropDownModule,
        PdfViewerModule,
        MatPaginatorModule,
    ]
})
export class CiPmeModule { }
