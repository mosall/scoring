import { Component, OnInit } from '@angular/core';
import {IdentificationService} from "../../../services/identification.service";
import {Router} from "@angular/router";
import {ReferentielService} from "../../../services/referentiel.service";

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
              private referentielService: ReferentielService,
              private router: Router) { }

  ngOnInit(): void {
    this.getListSecteur();
    this.getListPme();
  }

  getListPme(){
    this.identificationService.getListPme().subscribe(
      data => {
        // @ts-ignore
        data.sort((a: { id: number; }, b: { id: number; }) => a.id > b.id);
        this.listPme = data;
        this.listPmeTmp = data;
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
        if(pme.secteurs[0].id == event.target.value){
          this.listPme.push(pme);
        }
      }
    }
  }

  gotoDetails(id: any){
    this.router.navigateByUrl('/ci-pme/accueil/' + id);
  }

}
