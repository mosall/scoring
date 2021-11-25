import { Component, OnInit } from '@angular/core';
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
    this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
      data => {
        this.entreprise = data;
        // @ts-ignore
        this.secteur = data.secteurs[0].libelle;
        this.getDirigeant();
      }
    )
  }

  getDirigeant(){
    this.identificationService.getDirigeant(this.entreprise?.id).subscribe(
      data => {
        this.dirigeant = data;
        console.log(data)
      }
    )
  }

}
