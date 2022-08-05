import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-demande-cloturee',
  templateUrl: './demande-cloturee.component.html',
  styleUrls: ['./demande-cloturee.component.css']
})
export class DemandeClotureeComponent implements OnInit {

  demandeCloturees: any;
  idEntreprise: any;

  constructor(
    private demandeScoringService: DemandeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.idEntreprise = this.activatedRoute.snapshot.paramMap.get('idEntreprise');
    
  }

  ngOnInit(): void {
    this.getListDemandeCloturee(this.idEntreprise);
  }

  getListDemandeCloturee(idEntreprise: any){
      this.demandeScoringService.getDemandeCloturee(idEntreprise).subscribe(
        (data: any) => {
        console.log("🚀 ~ file: demande-cloturee.component.ts ~ line 29 ~ DemandeClotureeComponent ~ getListDemandeCloturee ~ data", data)
          this.demandeCloturees = data;
        },
        (err: HttpErrorResponse) => {console.log(err)}
      )
  }

  gotoDetails(idDemande: number){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
      this.router.navigateByUrl('/ci-pme/accueil/' + this.idEntreprise + '/demandes-cloturees/'+idDemande);
    });
  }

  counter(i: any) {
    return new Array(Math.round(parseInt(i)));
  }

  parseToInt(i: any){
    return parseInt(i);
  }
}
