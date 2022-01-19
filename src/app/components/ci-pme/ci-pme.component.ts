import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {IdentificationService} from "../../services/identification.service";
import { AppSettings } from 'src/app/settings/app.settings';
import {CiPmeService} from "../../services/ci-pme.service";
import { DemandeService } from 'src/app/services/demande.service';
import Swal from 'sweetalert2';

import { filter, map, switchMap, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-ci-pme',
  templateUrl: './ci-pme.component.html',
  styleUrls: ['./ci-pme.component.scss']
})
export class CiPmeComponent implements OnInit {
  user: any = null;
  entreprise: any = null;
  currentYear = new Date().getFullYear();
  canActivateEligibility = false;
  canActivateIndicateur = false;
  demande: any;
  idEntreprise: any;

  // routePathParam: Observable<string|null>;
  // navigationEnd: Observable<NavigationEnd>;


  constructor(private authService: AuthService, private router: Router, private ciPmeService: CiPmeService,
              private identificationService: IdentificationService, private demandeService: DemandeService,
              private activatedRoute: ActivatedRoute
  ) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
         route = route.firstChild;
        }
        return route;
       }),
       switchMap(route => {
        return route.paramMap.pipe(
                      map(paramMap => paramMap.get('idEntreprise'))
                    );
       })
      )
      .subscribe(
        data => {
          this.idEntreprise = data? +data : null;
          if(this.idEntreprise){
            this.getEntreprise();
          }
        }
      )

    }

  ngOnInit(): void {
    this.authService.getUserInfos().subscribe(
      data => {
        sessionStorage.setItem('connectedUserData', JSON.stringify(data));
        this.user = data;
        this.idEntreprise = this.user?.entrepriseId;
        this.getEntreprise()
        
      }
    );


  }

  logout(){
    const token = sessionStorage.getItem('connectedUser');
    if (token != null){
      sessionStorage.removeItem("connectedUser");
      // this.router.navigate(['/'])
      window.location.href = AppSettings.UM_HOME;
    }
  }

  getEntreprise(){
    this.identificationService.getEntreprise(this.idEntreprise).subscribe(
      data => {
        this.entreprise = data;
        // console.log('Entreprise ci :: ', data);

        this.getDemandeEnCours(this.entreprise?.id);
      }
    );
  }

  getDemandeEnCours(idEntreprise: any){
    this.demandeService.getDemandeOuverte(idEntreprise).subscribe(
      (data: any) => {
        this.demande = data;
        // console.log("Demande ci ::", data);

        // @ts-ignore
        this.canActivateEligibility = data && data?.status != 6;

        // @ts-ignore
        this.canActivateIndicateur = data && data?.status != 6;

      },
      err => console.log(err)
    );
  }

  createDemande(){
    this.demandeService.createDemande(this.user?.entrepriseId).subscribe(
      data => {
        this.successMsgBox('Une demande de scoring a été bien créée.');
      },
      err => console.log(err)
    );
  }

  goTo(path: string, param: number = 0){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
      if(param == 0){
        this.router.navigate([path])
      }
      else{
        this.router.navigate([path, param != 0? param : '']);
      }
    });
  }

  successMsgBox(msg: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    }).then(
      ()=> window.location.reload()
    );
  }

  errorMsgBox(msg: any){
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    });
  }

}
