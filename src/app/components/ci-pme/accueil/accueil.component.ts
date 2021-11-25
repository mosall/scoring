import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {IdentificationService} from "../../../services/identification.service";

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
  constructor(private identificationService: IdentificationService) { }

  ngOnInit(): void {
    this.getEntreprise();
  }

  getEntreprise(){
    Swal.fire({title: 'Veuillez patienter ...', allowEscapeKey: false, allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
      data => {
        this.entreprise = data;
        // @ts-ignore
        this.secteur = data.secteurs[0].libelle;
        this.getDirigeant();
        Swal.close();
      }
    )
  }

  getDirigeant(){
    this.identificationService.getDirigeant(this.entreprise?.id).subscribe(
      data => {
        this.dirigeant = data;
        Swal.close();
        console.log(data)
      }
    )
  }

}
