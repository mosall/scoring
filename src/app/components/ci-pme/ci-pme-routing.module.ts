import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {EligibiliteComponent} from "./eligibilite/eligibilite.component";
import {QualitatifComponent} from "./qualitatif/qualitatif.component";
import {CiPmeComponent} from "./ci-pme.component";
import {IdentificationComponent} from "./identification/identification.component";
import {IndicateursComponent} from "./indicateurs/indicateurs.component";

const routes: Routes = [
  {
    path: '',
    component: CiPmeComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: 'accueil',
        component: AccueilComponent,
      },
      {
        path: 'questionnaire-eligibilite',
        component: EligibiliteComponent,
      },
      {
        path: 'questionnaire-qualitatif',
        component: QualitatifComponent
      },
      {
        path: 'identification',
        component: IdentificationComponent
      },
      {
        path: 'indicateurs-financiers',
        component: IndicateursComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiPmeRoutingModule { }
