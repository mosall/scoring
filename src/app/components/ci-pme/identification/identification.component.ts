import { Component, OnInit } from '@angular/core';
import {IdentificationService} from "../../../services/identification.service";
import Swal from "sweetalert2";
import {ReferentielService} from "../../../services/referentiel.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Nationalities} from "../../../utils/nationalities";
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

  idDirigeant: any = null;
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
  listNationalite = Nationalities.nationalities;
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));

  constructor(private identificationService: IdentificationService,
              private referentielService: ReferentielService, private authService: AuthService,
              private router: Router) { }

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
        // @ts-ignore
        this.idEntreprise = data.id;

        this.authService.getUserInfos().subscribe(
          data => {
            sessionStorage.setItem('connectedUserData', JSON.stringify(data));
          }
        );

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
          this.idEntreprise = data?.id;
          // @ts-ignore
          this.raisonSociale = data?.raisonSociale;
          // @ts-ignore
          this.annee = data?.annee;
          // @ts-ignore
          this.formeJur = data?.formeJur.id
          // @ts-ignore
          this.capital = data?.capital;
          // @ts-ignore
          this.secteur = data?.secteurs[0].id;
          // @ts-ignore
          this.regime = data?.regime;
          // @ts-ignore
          this.siteWeb = data?.siteWeb;
          // @ts-ignore
          this.logo = data?.logo;
          // @ts-ignore
          this.description = data?.description;
          // @ts-ignore
          this.adresse = data?.adresse;

          this.getDirigeant();
        }
      )
    }
  }

  getDirigeant(){
    this.identificationService.getDirigeant(this.idEntreprise).subscribe(
      data => {
        // @ts-ignore
        this.idDirigeant = data.id;
        // @ts-ignore
        this.nom = data.nom;
        // @ts-ignore
        this.prenom = data.prenom;
        // @ts-ignore
        this.mobile = data.mobile;
        // @ts-ignore
        this.email = data.email;
        // @ts-ignore
        this.niveau = data.niveau;
        // @ts-ignore
        this.adresseDirigeant = data.adresse;
        // @ts-ignore
        this.nationalite = data.nationalite;
        // @ts-ignore
        this.typePiece = data.typePiece;
        // @ts-ignore
        this.numeroCI = data.numeroCI;
        // @ts-ignore
        this.sexe = data.sexe;
        // @ts-ignore
        this.date = data.date;
        // @ts-ignore
        this.lieu = data.lieu;
      }
    )
  }

  saveDirigeant(){
    this.submittedD = true;

    const payload = {
      id: this.idDirigeant,
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
      timer: 5000
    }).then(
      () => {
        this.idDirigeant == null ? this.router.navigateByUrl('/ci-pme/questionnaire-eligibilite') : this.router.navigateByUrl('/ci-pme/accueil');
      }
    );
  }

  errorMsgBox(msg: any){
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 5000
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
