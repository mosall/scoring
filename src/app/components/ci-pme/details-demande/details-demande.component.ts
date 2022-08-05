import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccompagnementService } from 'src/app/services/accompagnement.service';
import { CiPmeService } from 'src/app/services/ci-pme.service';
import { DemandeService } from 'src/app/services/demande.service';
import { IdentificationService } from 'src/app/services/identification.service';
import { IndicateursService } from 'src/app/services/indicateurs.service';
import { QualitatifService } from 'src/app/services/qualitatif.service';

@Component({
  selector: 'app-details-demande',
  templateUrl: './details-demande.component.html',
  styleUrls: ['./details-demande.component.css']
})
export class DetailsDemandeComponent implements OnInit {
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));
  scoreFinal: any;
  scores: any;
  displayScoreQualitatif: any;
  demande: any;
  listRatio: any = [];
  displayRatio: any;
  chartValues: { data: any[]; label: string; }[] = [];
  chartLibelles: string[] = [];
  displayRadar: any;
  radarChartType: any = 'radar';

  demandeAccompagnement: any;
  idDemande: any;

  constructor(
    private identificationService: IdentificationService,
    private activatedRoute: ActivatedRoute,
    private qualitatifService: QualitatifService,
    private indicateursService: IndicateursService,
    private demandeService: DemandeService,
    private ciPmeService: CiPmeService,
    private accompagnementService: AccompagnementService
  ) {
    this.idDemande = this.activatedRoute.snapshot.paramMap.get('idDemande');
   }

  ngOnInit(): void {
    if(this.idDemande){
      this.getDemande(this.idDemande);
      this.getScore(this.idDemande);
      this.getScoreQualitatif(this.idDemande);
      this.getRatio(this.idDemande);
    }
  }

  getDemande(id: number){
    this.demandeService.getDemande(id).subscribe(
      (data: any) => {
        this.demande = data;
      },
      (err: HttpErrorResponse) => {console.log(err)}
    )
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
        this.displayScoreQualitatif = this.demande && this.demande?.repQuali && this.scores.length != 0; // this.parametres.length;
        this.getRadarData();
      },
      err => console.log(err)
    );
  }

  getRatio(id: any){
    this.indicateursService.getRatio(id).subscribe(
      data => {
        console.log('Ratio :: ', data);
        
        // @ts-ignore
        data.listValeurRatioDTO.sort((a: any, b: any) => a.idRatio > b.idRatio);
        this.listRatio = data;
        this.displayRatio = this.demande && this.demande?.indicateurAjoute && this.listRatio?.listValeurRatioDTO?.length > 0 && this.listRatio?.scoreDTO;
        console.log("🚀 ~ file: accueil.component.ts ~ line 97 ~ AccueilComponent ~ getRatio ~ this.displayRatio", this.listRatio?.listValeurRatioDTO?.length, this.listRatio?.scoreDTO)
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
    this.displayRadar = this.scoreFinal?.score_financier && this.scores.length > 0 && this.demande;
  }

  formatNumberNDecimal(num:any, digits: any){
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = num.toString().match(re);
    return m ? parseFloat(m[1]) : (num.valueOf()).toString().includes('.') ? num.valueOf() : num.valueOf()+".0" ;
  }

  roundValue(numb: any){
    return Math.round((numb + Number.EPSILON) * 10) / 10;
  }

  formatDate(date:any){
    let formattedDate: any = new Date(date);
    let dd = String(formattedDate.getDate()).padStart(2, '0');
    let mm = String(formattedDate.getMonth() + 1).padStart(2, '0');
    let yyyy = formattedDate.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }
  

}
