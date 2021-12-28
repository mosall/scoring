import { Component, OnInit } from '@angular/core';
import {IdentificationService} from "../../../services/identification.service";
import {Router} from "@angular/router";
import {ReferentielService} from "../../../services/referentiel.service";
import {CiPmeService} from "../../../services/ci-pme.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-lis-pme',
  templateUrl: './lis-pme.component.html',
  styleUrls: ['./lis-pme.component.css']
})
export class LisPmeComponent implements OnInit {
  listPme: any = [];
  listPmeTmp: any = [];
  listSecteur: any = [];

  constructor(private identificationService: IdentificationService,
              private referentielService: ReferentielService, private ciPmeService: CiPmeService,
              private router: Router) { }

  ngOnInit(): void {
    this.getListSecteur();
    this.getListPme();
  }

  getListPme(){
    this.ciPmeService.getListPme().subscribe(
      data => {
        console.log(data)
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

              this.listPme.push({pme, logo, demande})
              this.listPmeTmp.push({pme, logo, demande})
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
    }
    else{
      for (let pme of this.listPmeTmp){
        if(pme.pme.secteurs[0].id == event.target.value){
          this.listPme.push(pme);
        }
      }
    }
  }

  gotoDetails(id: any){
    this.router.navigateByUrl('/ci-pme/accueil/' + id);
  }

  counter(i: any) {
    return new Array(Math.round(parseInt(i)));
  }

  parseToInt(i: any){
    return parseInt(i);
  }

}
