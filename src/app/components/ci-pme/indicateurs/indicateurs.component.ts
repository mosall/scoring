import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {IndicateursService} from "../../../services/indicateurs.service";
import {IdentificationService} from "../../../services/identification.service";
import {AuthService} from "../../../services/auth.service";
declare var $: any;
@Component({
  selector: 'app-indicateurs',
  templateUrl: './indicateurs.component.html',
  styleUrls: ['./indicateurs.component.css']
})
export class IndicateursComponent implements OnInit {
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));
  entreprise: any = [];
  listYear: any = [];
  financialYear: any = null;
  indicateurs = [
    [
      {code: 'BK', nom: 'Actif circulant', source: 'Bilan actif', value: ''},
      {code: 'BT', nom: 'Trésorerie actif', source: 'Bilan actif', value: ''},
      {code: 'DP', nom: 'Passif circulant', source: 'Bilan passif', value: ''},
      {code: 'DT', nom: 'Trésorerie passif', source: 'Bilan passif', value: ''},
      {code: 'XI', nom: 'Résultat net', source: 'Compte de résultat', value: ''},
      {code: 'XB', nom: 'Chiffres d\'affaires', source: 'Compte de résultat', value: ''},
      {code: 'BI', nom: 'Créances clients', source: 'Bilan actif', value: ''},
      {code: 'CAF', nom: 'Capacité d\'autofinancement', source: 'Compte de résultat', value: ''},
      {code: 'CA', nom: 'Capitaux propres', source: 'Bilan passif', value: ''},
      {code: 'DF', nom: 'Total ressources', source: 'Bilan passif', value: ''},
      {code: 'DJ', nom: 'Dettes fournisseurs', source: 'Bilan passif', value: ''},
      {code: 'RA', nom: 'Achats', source: 'Compte de résultat', value: ''},
      {code: 'XD', nom: 'Excédents brut d\'exploitation', source: 'Compte de résultat', value: ''},
      {code: 'RM', nom: 'Charges financières', source: 'Compte de résultat', value: ''},
    ],
    [
      {code: 'BK', nom: 'Actif circulant', source: 'Bilan actif', value: ''},
      {code: 'BT', nom: 'Trésorerie actif', source: 'Bilan actif', value: ''},
      {code: 'DP', nom: 'Passif circulant', source: 'Bilan passif', value: ''},
      {code: 'DT', nom: 'Trésorerie passif', source: 'Bilan passif', value: ''},
      {code: 'XI', nom: 'Résultat net', source: 'Compte de résultat', value: ''},
      {code: 'XB', nom: 'Chiffres d\'affaires', source: 'Compte de résultat', value: ''},
      {code: 'BI', nom: 'Créances clients', source: 'Bilan actif', value: ''},
      {code: 'CAF', nom: 'Capacité d\'autofinancement', source: 'Compte de résultat', value: ''},
      {code: 'CA', nom: 'Capitaux propres', source: 'Bilan passif', value: ''},
      {code: 'DF', nom: 'Total ressources', source: 'Bilan passif', value: ''},
      {code: 'DJ', nom: 'Dettes fournisseurs', source: 'Bilan passif', value: ''},
      {code: 'RA', nom: 'Achats', source: 'Compte de résultat', value: ''},
      {code: 'XD', nom: 'Excédents brut d\'exploitation', source: 'Compte de résultat', value: ''},
      {code: 'RM', nom: 'Charges financières', source: 'Compte de résultat', value: ''},
    ],
    [
      {code: 'BK', nom: 'Actif circulant', source: 'Bilan actif', value: ''},
      {code: 'BT', nom: 'Trésorerie actif', source: 'Bilan actif', value: ''},
      {code: 'DP', nom: 'Passif circulant', source: 'Bilan passif', value: ''},
      {code: 'DT', nom: 'Trésorerie passif', source: 'Bilan passif', value: ''},
      {code: 'XI', nom: 'Résultat net', source: 'Compte de résultat', value: ''},
      {code: 'XB', nom: 'Chiffres d\'affaires', source: 'Compte de résultat', value: ''},
      {code: 'BI', nom: 'Créances clients', source: 'Bilan actif', value: ''},
      {code: 'CAF', nom: 'Capacité d\'autofinancement', source: 'Compte de résultat', value: ''},
      {code: 'CA', nom: 'Capitaux propres', source: 'Bilan passif', value: ''},
      {code: 'DF', nom: 'Total ressources', source: 'Bilan passif', value: ''},
      {code: 'DJ', nom: 'Dettes fournisseurs', source: 'Bilan passif', value: ''},
      {code: 'RA', nom: 'Achats', source: 'Compte de résultat', value: ''},
      {code: 'XD', nom: 'Excédents brut d\'exploitation', source: 'Compte de résultat', value: ''},
      {code: 'RM', nom: 'Charges financières', source: 'Compte de résultat', value: ''},
    ],
  ];
  reponsesIndicateur: any = [];
  listRatio: any = [];

  constructor(private indicateursService: IndicateursService, private authService: AuthService,
              private identificationService: IdentificationService) { }

  ngOnInit(): void {
    this.getListYear();
    this.getEntreprise();

    this.authService.getUserInfos().subscribe(
      data => {
        sessionStorage.setItem('connectedUserData', JSON.stringify(data));
      }
    );
  }

  getListYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear-1; i >= currentYear-5; i--){
      this.listYear.push(i);
    }
  }

  saveIndicateur(year: any){
    let payload = {
      annee: this.financialYear - year,
      entreprise: this.connectedUser?.entrepriseId,
      bkActifCirculant: this.indicateurs[year][0].value,
      btTresorerieActif: this.indicateurs[year][1].value,
      dpPassifCirculant: this.indicateurs[year][2].value,
      dtTresoreriePassif: this.indicateurs[year][3].value,
      xiResultatNet: this.indicateurs[year][4].value,
      xbChiffresDaffaires: this.indicateurs[year][5].value,
      biCreanceClient: this.indicateurs[year][6].value,
      caf: this.indicateurs[year][7].value,
      caCapitauxPropres: this.indicateurs[year][8].value,
      dfTotalRessources: this.indicateurs[year][9].value,
      djDettesFournisseurs: this.indicateurs[year][10].value,
      raAchats: this.indicateurs[year][11].value,
      xdExcedentBrutExploit: this.indicateurs[year][12].value,
      rmChargesFinancieres: this.indicateurs[year][13].value,
    }

    if(this.entreprise.indicateurAjoute){
      // @ts-ignore
      payload.id = this.reponsesIndicateur[year].id;
    }

    if(this.connectedUser?.entrepriseId){
      this.indicateursService.saveIndicateurs(payload).subscribe(
        data => {
          if(year != 0){
            $('.nav-tabs > .nav-item > .active').parent().next('li').find('a').trigger('click');
          }
          else {
            this.successMsgBox('Indicateurs enregistrés avec succès !');
          }
        },
        error => {
          this.errorMsgBox(error.error);
        }
      );
    }
    else {
      this.errorMsgBox('Veuillez identifier l\'entreprise avant d\'enregistrer les indicateurs.')
    }


  }

  getIndicateurs(){
    this.indicateursService.getIndicateurs(this.entreprise?.id).subscribe(
      data => {
        // @ts-ignore
        data.sort((a: any, b: any) => a.annee < b.annee);
        this.reponsesIndicateur = data;
        // @ts-ignore
        this.financialYear = data[0]?.annee;
        [0,1,2].forEach(i => this.setIndicateur(i, data));
      }
    )
  }

  setIndicateur(index: any, data: any){
    this.indicateurs[index] = [
      {code: 'BK', nom: 'Actif circulant', source: 'Bilan actif', value: data[index]?.bkActifCirculant},
      {code: 'BT', nom: 'Trésorerie actif', source: 'Bilan actif', value: data[index]?.btTresorerieActif},
      {code: 'DP', nom: 'Passif circulant', source: 'Bilan passif', value: data[index]?.dpPassifCirculant},
      {code: 'DT', nom: 'Trésorerie passif', source: 'Bilan passif', value: data[index]?.dtTresoreriePassif},
      {code: 'XI', nom: 'Résultat net', source: 'Compte de résultat', value: data[index]?.xiResultatNet},
      {code: 'XB', nom: 'Chiffres d\'affaires', source: 'Compte de résultat', value: data[index]?.xbChiffresDaffaires},
      {code: 'BI', nom: 'Créances clients', source: 'Bilan actif', value: data[index]?.biCreanceClient},
      {code: 'CAF', nom: 'Capacité d\'autofinancement', source: 'Compte de résultat', value: data[index]?.caf},
      {code: 'CA', nom: 'Capitaux propres', source: 'Bilan passif', value: data[index]?.caCapitauxPropres},
      {code: 'DF', nom: 'Total ressources', source: 'Bilan passif', value: data[index]?.dfTotalResources},
      {code: 'DJ', nom: 'Dettes fournisseurs', source: 'Bilan passif', value: data[index]?.djDettesFournisseurs},
      {code: 'RA', nom: 'Achats', source: 'Compte de résultat', value: data[index]?.raAchats},
      {code: 'XD', nom: 'Excédents brut d\'exploitation', source: 'Compte de résultat', value: data[index]?.xdExcedentBrutExploit},
      {code: 'RM', nom: 'Charges financières', source: 'Compte de résultat', value: data[index]?.rmChargesFinancieres},
    ];
  }

  getEntreprise(){
    if (this.connectedUser?.entrepriseId != null){
      this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
        data => {
          // @ts-ignore
          this.entreprise = data;
          if(this.entreprise?.indicateurAjoute){
            this.getIndicateurs();
            this.getRatio();
          }
        }
      )
    }
  }

  getRatio(){
    this.indicateursService.getRatio(this.entreprise?.id).subscribe(
      data => {
        console.log(data)
        // @ts-ignore
        data.listValeurRatioDTO.sort((a: any, b: any) => a.idRatio > b.idRatio);
        this.listRatio = data;
      }
    )
  }

  nextAndPreviousCtrl(){
    $('.previous-btn').click(() => {
      $('.nav-tabs > .nav-item > .active').parent().prev('li').find('a').trigger('click');
    });
  }

  successMsgBox(msg: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 1500
    }).then(
      ()=> window.location.reload()
    );
  }

  errorMsgBox(msg: any){
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 2500
    });
  }

}
