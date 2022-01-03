import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {IdentificationService} from "../../../services/identification.service";
import {ActivatedRoute} from "@angular/router";
import { QualitatifService } from 'src/app/services/qualitatif.service';
import { IndicateursService } from 'src/app/services/indicateurs.service';
import { DemandeService } from 'src/app/services/demande.service';
import {CiPmeService} from "../../../services/ci-pme.service";

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
  demande: any;
  motifRejet: any = '';

  status: any = [
    'Brouillon',
    'Envoyée',
    'Réceptionnée',
    'Rejetée',
    'Provisoire',
    'Cloturée'
  ];
  displayScoreQualitatif: boolean = false;
  displayRatio: boolean = false;
  displayRadar: boolean = false;
  parametres: any[] = [];

  constructor(
    private identificationService: IdentificationService,
    private activatedRoute: ActivatedRoute,
    private qualitatifService: QualitatifService,
    private indicateursService: IndicateursService,
    private demandeService: DemandeService,
    private ciPmeService: CiPmeService,
    ) { }

  ngOnInit(): void {
    this.idEntreprise = this.activatedRoute.snapshot.paramMap.get('idEntreprise');
    this.getEntreprise();
    this.getParametre();
    // this.getScore(this.idEntreprise);
    // this.getScoreQualitatif(this.idEntreprise);
    // this.getRatio(this.idEntreprise);
    // this.getRadarData();
  }
  getParametre() {
    this.qualitatifService.getParameter().subscribe(
      (data: any) => { this.parametres = data},
      err => console.log(err)
    );
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
        this.displayScoreQualitatif = this.demande && this.demande?.repQuali && this.scores.length == this.parametres.length;
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
    this.displayRadar = this.scoreFinal?.score_financier && this.scores.length == this.parametres.length && this.demande;
  }

  getEntreprise(){
    Swal.fire({title: 'Veuillez patienter ...', allowEscapeKey: false, allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    if(this.connectedUser?.profil?.code == 'ROLE_EXP_PME'){
      this.identificationService.getEntreprise(this.idEntreprise).subscribe(
        data => {
          this.entreprise = data;
          // @ts-ignore
          this.secteur = data.secteurs;
          this.getDirigeant();
          this.getDemandeEnCours(this.idEntreprise);
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
          this.getDemandeEnCours(this.entreprise?.id);
          this.getDirigeant();
          this.getLogo();
          Swal.close();
        },
        err => console.log('Accueil :: Entreprise ::', err)        
      );
    }
  }


  getLogo(){
    this.identificationService.getLogo(this.connectedUser?.entrepriseId).subscribe(
      data => {
        // @ts-ignore
        this.logo = "data:image/png;base64,"+data[0]?.contenu;
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

  getDemandeEnCours(idEntreprise: any){
    this.demandeService.getDemandeOuverte(idEntreprise).subscribe(
      (data: any) => {
        this.demande = data;
        console.log("Demande::: ", this.demande);
        if(this.demande == null){
          this.getLastClosedDemande(idEntreprise);
        }
        else if (this.demande != null){
          if( this.demande?.indicateurAjoute && this.demande?.repQuali){
            this.getScore(this.demande?.id);
          }
          if(this.demande?.repQuali){
            this.getScoreQualitatif(this.demande?.id);
          }
          if([3, 5].includes(this.demande?.status)){
            this.getRatio(this.demande?.id);
          }
        }
      },
      err => console.log(err)
    );
  }


  getLastClosedDemande(idEntreprise: any){
    this.demandeService.getLastClosedDemande(idEntreprise).subscribe(
      (data: any) => {
        this.demande = data;
        if(this.demande != null){
          if( this.demande?.indicateurAjoute && this.demande?.repQuali){
            this.getScore(this.demande?.id);
          }
          if(this.demande?.repQuali){
            this.getScoreQualitatif(this.demande?.id);
          }
          if([3, 5].includes(this.demande?.status)){
            this.getRatio(this.demande?.id);
          }
          console.log('Last ::', data);
        }
      },
      err => console.log(err)
    );
  }

  receiveDemande(){
    this.demandeService.receiveDemande(this.demande?.id).subscribe(
      (data: any) => {
        this.successMsgBox("La demande de scoring a été bien réceptionnée.")
      },
      err => console.log(err)
    );
  }

  rejectDemande(){
    const data = {
      motif_rejet: this.motifRejet
    }
    this.demandeService.rejectDemande(this.demande?.id, data).subscribe(
      (data: any) => {
        this.motifRejet = '';
        this.successMsgBox('La demande a été bien rejeté.');
      },
      err => console.log(err)
    );
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

  successMsgBox(msg: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    }).then(()=> window.location.reload());
  }

  errorMsgBox(msg: any){
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    }).then(() => window.location.reload());
  }
}
