import { Component, OnInit } from '@angular/core';
import {IdentificationService} from "../../../services/identification.service";
import Swal from "sweetalert2";
import {ReferentielService} from "../../../services/referentiel.service";
declare var $: any;
@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {

  raisonSociale: any = '';
  annee: any = '';
  capital: any = '';
  secteur: any = '';
  description: any = '';
  regime: any = '';
  adresse: any = '';
  siteWeb: any = '';
  logo: any = '';
  formeJur: any = '';

  nom: any = '';
  prenom: any = '';
  mobile: any = '';
  niveau: any = '';
  email: any = '';
  sexe: any = '';
  date: any = '';
  lieu: any = '';
  nationalite: any = '';
  adresseDirigeant: any = '';
  typePiece: any = '';
  numeroCI: any = '';
  idEntreprise = null;

  submittedE = false;
  submittedD = false;

  listSecteur: any = [];
  listFormJurique: any = [];
  listYear: any = [];
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));

  constructor(private identificationService: IdentificationService,
              private referentielService: ReferentielService,) { }

  ngOnInit(): void {
    this.nextAndPreviousCtrl();
    this.getListYear();
    this.getListSecteur();
    this.getListFormJuridique();
  }

  nextAndPreviousCtrl(){
    $('.previous-btn').click(() => {
      $('.nav-pills > .active').prev('a').trigger('click');
    });

    this.getEntreprise();
  }

  saveEntreprise(){
    this.submittedE = true;

    const paylaod = {
      id: this.idEntreprise,
      raisonSociale: this.raisonSociale,
      annee: this.annee,
      capital: this.capital,
      secteurs: [parseInt(this.secteur)],
      description: this.description,
      regime: this.regime,
      adresse: this.adresse,
      siteWeb: this.siteWeb,
      logo: this.logo,
      formeJuridique: parseInt(this.formeJur)
    }

    this.identificationService.saveEntreprise(paylaod).subscribe(
      data => {
        console.log(data);
        // @ts-ignore
        this.idEntreprise = data.id;
        $('.nav-pills > .active').next('a').trigger('click');
      },
      error => {
        this.errorMsgBox(error.error);
        console.log(error)
      }
    );
  }

  getEntreprise(){
    if (this.connectedUser?.entrepriseId != null){
      this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
        data => {
          // @ts-ignore
          this.idEntreprise = data[0].id;
          // @ts-ignore
          this.raisonSociale = data[0].raisonSociale;
          // @ts-ignore
          this.annee = data[0].annee;
          // @ts-ignore
          this.formeJur = data[0].formeJur.id
          // @ts-ignore
          this.capital = data[0].capital;
          // @ts-ignore
          this.secteur = data[0].secteurs[0].id;
          // @ts-ignore
          this.regime = data[0].regime;
          // @ts-ignore
          this.siteWeb = data[0].siteWeb;
          // @ts-ignore
          this.logo = data[0].logo;
          // @ts-ignore
          this.description = data[0].description;
          // @ts-ignore
          this.adresse = data[0].adresse;
        }
      )
    }
  }

  saveDirigeant(){
    this.submittedD = true;

    const payload = {
      nom: this.nom,
      prenom: this.prenom,
      mobile: this.mobile,
      niveau: this.niveau,
      email: this.email,
      sexe: this.sexe,
      date: this.date,
      lieu: this.lieu,
      nationalite: this.nationalite,
      adresse: this.adresseDirigeant,
      typePiece: this.typePiece,
      numeroCI: this.numeroCI,
      entreprise: this.idEntreprise
    }

    this.identificationService.saveDirigeant(payload).subscribe(
      data => {
        this.successMsgBox('Les identifications de l\'entreprise sont bien enregistrées');
      },
      error => {
        this.errorMsgBox(error.error);
      }
    );
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

  getListSecteur(){
    this.referentielService.getListSecteur().subscribe(
      data => this.listSecteur = data
    );
  }

  getListYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1950; i--){
      this.listYear.push(i);
    }
  }

  getListFormJuridique(){
    this.referentielService.getListFormJuridique().subscribe(
      data => this.listFormJurique = data
    );
  }
}
