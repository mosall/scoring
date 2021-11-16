import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicateurs',
  templateUrl: './indicateurs.component.html',
  styleUrls: ['./indicateurs.component.css']
})
export class IndicateursComponent implements OnInit {
  listYear: any = [];
  financialYear: any = '';
  indicateurs = {
    indicateurYear_2: [
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
    ],
    indicateurYear_1: [
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
    ],
    indicateurYear_: [
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
    ],
  };

  constructor() { }

  ngOnInit(): void {
    this.getListYear();
  }

  getListYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1950; i--){
      this.listYear.push(i);
    }
  }

  saveIndicateur(year: any){}

}
