import { Component, OnInit } from '@angular/core';
import {IdentificationService} from "../../../services/identification.service";
import Swal from "sweetalert2";
import {ReferentielService} from "../../../services/referentiel.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Nationalities} from "../../../utils/nationalities";
declare var $: any;
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {HttpClient} from "@angular/common/http";

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
  logo: any = null;
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

  isPointFocal = 'non';

  entreprise: any = [];
  dropdownSecteur = [];
  selectedSecteurs = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Sélectionner tout',
    unSelectAllText: 'Effacer tout',
    searchPlaceholderText: 'Rechercher...',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  logoImg: any = null;
  images: any = null;

  formData = new FormData();

  constructor(private identificationService: IdentificationService,
              private referentielService: ReferentielService, private authService: AuthService,
              private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getEntreprise();

    this.nextAndPreviousCtrl();

    this.getListYear();
    this.getListSecteur();
    this.getListFormJuridique();
  }

  nextAndPreviousCtrl(){
    $('.previous-btn').click(() => {
      $('.nav-pills > .active').prev('a').trigger('click');
    });
  }

  saveEntreprise(){
    this.submittedE = true;

    let secteurs: any = [];
    // @ts-ignore
    this.selectedSecteurs.forEach(item => secteurs.push(parseInt(item.item_id)));
    const payload = {
      id: this.idEntreprise,
      raisonSociale: this.raisonSociale,
      annee: this.annee,
      capital: this.capital,
      secteurs,
      description: this.description,
      regime: this.regime,
      adresse: this.adresse,
      siteWeb: this.siteWeb,
      formeJuridique: parseInt(this.formeJur)
    }

    this.identificationService.saveEntreprise(payload).subscribe(
      data => {
        // @ts-ignore
        this.idEntreprise = data.id;

        this.authService.getUserInfos().subscribe(
          data => sessionStorage.setItem('connectedUserData', JSON.stringify(data))
        );

        if (this.logoImg != null){
          const formData = new FormData();
          formData.append('files', this.logoImg, this.logoImg.name);

          this.identificationService.uploadLogo(this.idEntreprise, formData).subscribe(
            data => {},
            error => this.errorMsgBox(error.error)
          );
        }

        $('.nav-pills > .active').next('a').trigger('click');
        this.getEntreprise();
      },
      error => {
        this.errorMsgBox(error.error);
      }
    );
  }

  getEntreprise(){
    if (this.connectedUser?.entrepriseId != null){
      this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
        data => {
          this.entreprise = data;
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
          this.description = data?.description;
          // @ts-ignore
          this.adresse = data?.adresse;

          this.getDirigeant();

          this.identificationService.getLogo(this.connectedUser?.entrepriseId).subscribe(
            data1 => {
              // @ts-ignore
              if (data1[0]){
                // @ts-ignore
                this.logo = "data:image/png;base64,"+data1[0].contenu;
              }
            }
          );
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
        // this.idDirigeant == null ? this.router.navigateByUrl('/ci-pme/questionnaire-eligibilite') : this.router.navigateByUrl('/ci-pme/accueil');
        // this.router.navigateByUrl('/ci-pme/accueil');
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/ci-pme/accueil']));
      }
    );
  }

  errorMsgBox(msg: any){
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    }).then(() => {});
  }

  getListYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1950; i--){
      this.listYear.push(i);
    }
  }

  getListSecteur(){
    let tmp: any = [];
    let tmpSelectedItems: any = [];

    this.referentielService.getListSecteur().subscribe(
      data => {
        this.listSecteur = data;
        // @ts-ignore
        data.forEach(d => tmp.push({item_id: d.id, item_text: d.libelle}));
        this.dropdownSecteur = tmp;

        if (this.entreprise != []){
          // @ts-ignore
          this.entreprise?.secteurs?.forEach(d => tmpSelectedItems.push({item_id: d.id, item_text: d.libelle}));
          this.selectedSecteurs = tmpSelectedItems;
        }

      }
    );
  }

  getListFormJuridique(){
    this.referentielService.getListFormJuridique().subscribe(
      data => this.listFormJurique = data
    );
  }

  pointFocalIsDirigeant(){
    console.log(this.connectedUser);
    if (this.isPointFocal == 'oui'){
      this.nom = this.connectedUser.nom;
      this.prenom = this.connectedUser.prenom;
      this.email = this.connectedUser.email;
      this.mobile = this.connectedUser.mobile;
      this.idDirigeant = this.connectedUser.id;
    }
    else {
      this.nom = '';
      this.prenom = '';
      this.email = '';
      this.mobile = '';
      this.idDirigeant = null;
    }
  }

  onItemSelect(item: any) {
    // @ts-ignore
    this.selectedSecteurs.push(item);
  }

  onItemDeselect(item: any){
    // @ts-ignore
    this.selectedSecteurs.splice(this.selectedSecteurs.indexOf(this.selectedSecteurs.find(secteur => secteur.item_id == item.item_id)), 1);
  }

  onSelectAll(items: any) {
    // @ts-ignore
    items.forEach(item => this.selectedSecteurs.push(item));
  }

  onDeselectAll(){
    this.selectedSecteurs = [];
  }

  addFileToList(){
    const fileInput = document.getElementById('logoImg') as HTMLInputElement;
    // @ts-ignore
    this.logoImg = fileInput.files[0];
    this.images = [];
    const reader = new FileReader();
    reader.onload = (event:any) => {
      // @ts-ignore
      this.images.push(event.target.result);
    }
    reader.readAsDataURL(this.logoImg);
  }

  deleteImage(){
    this.images = null;
    this.logoImg = null;
  }
}
