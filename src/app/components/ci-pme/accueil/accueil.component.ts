import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {IdentificationService} from "../../../services/identification.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));
  entreprise: any = [];
  dirigeant: any = [];
  secteur: any = '';
  idEntreprise: any = '';
  constructor(private identificationService: IdentificationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idEntreprise = this.activatedRoute.snapshot.params.idEntreprise;
    this.getEntreprise();
  }

  getEntreprise(){
    Swal.fire({title: 'Veuillez patienter ...', allowEscapeKey: false, allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    if(this.connectedUser.profil.code == 'ROLE_EXP_PME'){
      this.identificationService.getEntreprise(this.idEntreprise).subscribe(
        data => {
          this.entreprise = data;
          // @ts-ignore
          this.secteur = data.secteurs[0].libelle;
          this.getDirigeant();
          Swal.close();
        }
      );
    }
    else {
      this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
        data => {
          this.entreprise = data;
          // @ts-ignore
          this.secteur = data.secteurs[0].libelle;
          this.getDirigeant();
          Swal.close();
        }
      );
    }
  }

  getDirigeant(){
    this.identificationService.getDirigeant(this.entreprise?.id).subscribe(
      data => {
        this.dirigeant = data;
        Swal.close();
      }
    )
  }

  formatNumber(num: any){
    return Number(num.toFixed(0)).toLocaleString();
  }

}
