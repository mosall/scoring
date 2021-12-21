import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {IdentificationService} from "../../../services/identification.service";
import {ActivatedRoute} from "@angular/router";
import { QualitatifService } from 'src/app/services/qualitatif.service';
import { IndicateursService } from 'src/app/services/indicateurs.service';

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
  score: any;
  listRatio: any;
  scoreFinal: any;
  scores: any;

  chartLibelles: any ;
  chartValues: any;
  radarChartType: any = 'radar';

  logo: any = null;

  constructor(
    private identificationService: IdentificationService,
    private activatedRoute: ActivatedRoute,
    private qualitatifService: QualitatifService,
    private indicateursService: IndicateursService
    ) { }

  ngOnInit(): void {
    this.idEntreprise = this.connectedUser?.entrepriseId;
    this.getEntreprise();
    this.getScore(this.idEntreprise);
    this.getScoreQualitatif(this.idEntreprise);
    this.getRatio(this.idEntreprise);
    // this.getRadarData();
  }

  getScore(id: any){
    this.qualitatifService.getScoreFinal(id).subscribe(
      (data: any) => {
        this.scoreFinal = data;
      },
      err => console.log(err)
    );
  }

  getScoreQualitatif(id: any){
    this.qualitatifService.getScoreQualitatif(id).subscribe(
      (data: any) => {
        this.scores = data;
        this.getRadarData();
      },
      err => console.log(err)
    );
  }

  getRatio(id: any){
    this.indicateursService.getRatio(id).subscribe(
      data => {
        // @ts-ignore
        data.listValeurRatioDTO.sort((a: any, b: any) => a.idRatio > b.idRatio);
        this.listRatio = data;
      }
    )
  }

  getRadarData(){
    const data = [];
    data.push(this.scoreFinal?.score_financier ? this.scoreFinal?.score_financier : 0);
    const labels = ['Score Financier/Solvabilité'];
    this.scores?.map((s: any) => {
      data.push(s?.score);
      labels.push(s?.parametre?.libelle)
    });
    this.chartValues = [{
      data,
      label: 'Score qualitatif'
    }];
    this.chartLibelles = labels;
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
          this.secteur = data.secteurs;
          this.getDirigeant();
          this.getLogo();
          Swal.close();
        },
        err => {
          Swal.close();
          
        }
      );
    }
    else {
      this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
        data => {
          this.entreprise = data;
          // @ts-ignore
          this.secteur = data.secteurs;
          this.getDirigeant();
          this.getLogo();
          Swal.close();
        }
      );
    }
  }


  getLogo(){
    this.identificationService.getLogo(this.connectedUser?.entrepriseId).subscribe(
      data => {
        // @ts-ignore
        this.logo = "data:image/png;base64,"+data[0].contenu;
      }
    );
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
    return Number(num.toFixed(0)).toLocaleString("fr-FR");
  }

  formatDate(date:any){
    let formattedDate: any = new Date(date);
    let dd = String(formattedDate.getDate()).padStart(2, '0');
    let mm = String(formattedDate.getMonth() + 1).padStart(2, '0');
    let yyyy = formattedDate.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  roundValue(numb: any){
    return Math.round((numb + Number.EPSILON) * 10) / 10;
  }

formatNumberNDecimal(num:any, digits: any){
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = num.toString().match(re);
    return m ? parseFloat(m[1]) : (num.valueOf()).toString().includes('.') ? num.valueOf() : num.valueOf()+".0" ;
  }
}
