import { Component, OnInit } from '@angular/core';
import {IdentificationService} from "../../../services/identification.service";
import Swal from "sweetalert2";
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

  constructor(private identificationService: IdentificationService) { }

  ngOnInit(): void {
    this.nextAndPreviousCtrl();
  }

  nextAndPreviousCtrl(){
    /*$('.next-btn').click(() => {
      $('.nav-pills > .active').next('a').trigger('click');
    });*/

    $('.previous-btn').click(() => {
      $('.nav-pills > .active').prev('a').trigger('click');
    });
  }

  saveEntreprise(){
    this.submittedE = true;

    const paylaod = {
      id: this.idEntreprise,
      raisonSociale: this.raisonSociale,
      annee: this.annee,
      capital: this.capital,
      secteur: this.secteur,
      description: this.description,
      regime: this.regime,
      adresse: this.adresse,
      siteWeb: this.siteWeb,
      logo: this.logo,
      formeJur: this.formeJur
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
      }
    );
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

}
