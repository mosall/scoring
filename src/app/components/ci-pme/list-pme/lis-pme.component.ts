import { Component, OnInit } from '@angular/core';
import {IdentificationService} from "../../../services/identification.service";
import {Router} from "@angular/router";
import {ReferentielService} from "../../../services/referentiel.service";
import {CiPmeService} from "../../../services/ci-pme.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-lis-pme',
  templateUrl: './lis-pme.component.html',
  styleUrls: ['./lis-pme.component.css']
})
export class LisPmeComponent implements OnInit {
  listPme: any = [];
  listPmeTmp: any = [];
  listSecteur: any = [];
  pageSlice: any;
  filtreType: number = 0;
  filtreStatut: number = 0;
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));
  pageSliceTmp: any;

  constructor(private identificationService: IdentificationService,
              private referentielService: ReferentielService, private ciPmeService: CiPmeService,
              private router: Router) { }

  ngOnInit(): void {
    this.getListSecteur();
    this.getListPme();
  }

  getListPme(){
    this.filtreType = 0;
    this.ciPmeService.getListPme().subscribe(
      data => {
        // @ts-ignore
        data.sort((a: { id: number; }, b: { id: number; }) => a.id > b.id);
        // @ts-ignore
        for (let pme of data){
          let demande: any = [];
          this.identificationService.getLogo(pme.id).subscribe(
            data1 => {
              let logo: any = '';
              // @ts-ignore
              if (data1[0]){
                // @ts-ignore
                logo = "data:image/png;base64,"+data1[0].contenu;
              }
              
              this.listPme.push({pme, logo, demande});
              this.listPmeTmp.push({pme, logo, demande});
              
              this.pageSlice = this.listPme.slice(0, 6);
              this.pageSliceTmp = this.pageSlice;

            },
            err => {
              this.listPme.push({pme, logo: "logo", demande});
              this.listPmeTmp.push({pme, logo: "logo", demande});

              this.pageSlice = this.listPme.slice(0, 6);
              this.pageSliceTmp = this.pageSlice;

            }
          );
        }
      }
    );
  }

  getListSecteur(){
    this.referentielService.getListSecteur().subscribe(
      data => {
        this.listSecteur = data;
      }
    );
  }

  filterPme(event: any){
    this.listPme = [];
    if (event.target.value == 0){
      this.listPme = this.listPmeTmp;
      this.pageSlice = this.listPme.slice(0, 6);
    }
    else{
      for (let pme of this.listPmeTmp){
        if(pme.pme.secteurs[0].id == event.target.value){
          this.listPme.push(pme);
          this.pageSlice = this.listPme.slice(0, 6);
        }
      }
    }
  }

  gotoDetails(id: any){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
      this.router.navigateByUrl('/ci-pme/accueil/' + id);
    });
  }

  counter(i: any) {
    return new Array(Math.round(parseInt(i)));
  }

  parseToInt(i: any){
    return parseInt(i);
  }

  handlePageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.listPme.length){
      endIndex = this.listPme.length;
    }

    this.pageSlice = this.listPme.slice(startIndex, endIndex);
    this.pageSliceTmp = this.pageSlice;
    this.filtreStatut = 0;
  }

  filterByType(event: any){
    this.filtreType = event.target.value;
    this.filtreStatut = 0;
    this.getListePMEByType(this.filtreType); 
  }

  filterByStatus(event: any){
    this.filtreStatut = event.target.value;
    console.log('slice', this.pageSliceTmp);
    
    if(this.filtreStatut == 30){
      this.pageSlice = this.pageSliceTmp.filter((pme: any) => pme?.pme?.demandeNonCloturee?.status == 3);  
      console.log('En cours', this.pageSlice);
    }
    else if(this.filtreStatut == 31){
      this.pageSlice = this.pageSliceTmp.filter((pme: any) =>  pme?.pme?.demandeAccompagnement?.status == 3);  
      console.log('Recep', this.pageSlice);
    }
    else if(this.filtreStatut == 0){
      this.pageSlice = this.pageSliceTmp;
    }
    else{
      this.pageSlice = this.pageSliceTmp.filter((pme: any) => pme?.pme?.demandeNonCloturee?.status == this.filtreStatut || pme?.pme?.demandeAccompagnement?.status == this.filtreStatut);  
    }
  }

  getListePMEByType(type: number){
    if(type == 1 ){
      this.listPme = this.listPmeTmp.filter((pme: any) => pme?.pme?.demandeNonCloturee != null);
      this.pageSlice = this.listPme.slice(0, 6);
      this.pageSliceTmp = this.listPme;
    }
    else if(type == 2 ){
      this.listPme = this.listPmeTmp.filter((pme: any) => pme?.pme?.demandeAccompagnement != null);
      this.pageSlice = this.listPme.slice(0, 6);
      this.pageSliceTmp = this.listPme;
    }
    else if(type == 0 ){
      this.listPme = this.listPmeTmp
      this.pageSlice = this.listPme.slice(0, 6);
      this.pageSliceTmp = this.listPme;
    }
    else if(type == 3 ){
      this.listPme = this.listPmeTmp.filter((pme: any) => pme?.pme?.demandeNonCloturee?.traiterPar == this.connectedUser?.id || pme?.pme?.demandeAccompagnement?.traiterPar == this.connectedUser?.id)
      this.pageSlice = this.listPme.slice(0, 6);
      this.pageSliceTmp = this.listPme;
    }

  }

}
