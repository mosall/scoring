import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {IndicateursService} from "../../../services/indicateurs.service";
declare var $: any;
@Component({
  selector: 'app-indicateurs',
  templateUrl: './indicateurs.component.html',
  styleUrls: ['./indicateurs.component.css']
})
export class IndicateursComponent implements OnInit {
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));
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
      {code: '', nom: 'CAF', source: 'Compte de résultat', value: ''},
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
      {code: '', nom: 'CAF', source: 'Compte de résultat', value: ''},
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
      {code: '', nom: 'CAF', source: 'Compte de résultat', value: ''},
      {code: 'CA', nom: 'Capitaux propres', source: 'Bilan passif', value: ''},
      {code: 'DF', nom: 'Total ressources', source: 'Bilan passif', value: ''},
      {code: 'DJ', nom: 'Dettes fournisseurs', source: 'Bilan passif', value: ''},
      {code: 'RA', nom: 'Achats', source: 'Compte de résultat', value: ''},
      {code: 'XD', nom: 'Excédents brut d\'exploitation', source: 'Compte de résultat', value: ''},
      {code: 'RM', nom: 'Charges financières', source: 'Compte de résultat', value: ''},
    ],
  ];

  constructor(private indicateursService: IndicateursService) { }

  ngOnInit(): void {
    this.getListYear();
  }

  getListYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear-1; i >= currentYear-5; i--){
      this.listYear.push(i);
    }
  }

  saveIndicateur(year: any){
    console.log(this.indicateurs[year]);

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

    this.indicateursService.saveIndicateurs(payload).subscribe(
      data => {
        this.successMsgBox('Indicateurs enregistrés avec succès !');
        if(year != 0){
          $('.nav-tabs > .nav-item > .active').parent().next('li').find('a').trigger('click');
        }
      },
      error => {
        this.errorMsgBox(error.error);
      }
    );
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
