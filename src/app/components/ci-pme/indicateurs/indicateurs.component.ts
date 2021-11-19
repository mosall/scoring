import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
declare var $: any;
@Component({
  selector: 'app-indicateurs',
  templateUrl: './indicateurs.component.html',
  styleUrls: ['./indicateurs.component.css']
})
export class IndicateursComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
    this.getListYear();
    this.nextAndPreviousCtrl();
  }

  getListYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear-1; i >= currentYear-5; i--){
      this.listYear.push(i);
    }
  }

  saveIndicateur(year: any){
    console.log(this.indicateurs[year])
  }

  nextAndPreviousCtrl(){
    /*$('.next-btn').click(() => {
      $('.nav-tabs > .active').next('a').trigger('click');
    });*/

    $('.previous-btn').click(() => {
      $('.nav-tabs > .nav-item > .active').parent().prev('li').find('a').trigger('click');
    });
  }

}
