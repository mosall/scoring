import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EligibiliteComponent} from "./eligibilite/eligibilite.component";
import {QualitatifComponent} from "./qualitatif/qualitatif.component";
import {CiPmeComponent} from "./ci-pme.component";
import {IdentificationComponent} from "./identification/identification.component";
import {IndicateursComponent} from "./indicateurs/indicateurs.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {LisPmeComponent} from "./list-pme/lis-pme.component";

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
        path: 'accueil/:idEntreprise',
        component: AccueilComponent,
      },
      {
        path: 'questionnaire-eligibilite',
        component: EligibiliteComponent,
      },
      {
        path: 'questionnaire-qualitatif/:idEntreprise',
        component: QualitatifComponent
      },
      {
        path: 'identification',
        component: IdentificationComponent
      },
      {
        path: 'indicateurs-financiers/:idEntreprise',
        component: IndicateursComponent
      },
      {
        path: 'liste-pme',
        component: LisPmeComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiPmeRoutingModule { }
