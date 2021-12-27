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

  routePathParam: Observable<string|null>;
  navigationEnd: Observable<NavigationEnd>;


  constructor(private authService: AuthService, private router: Router, private ciPmeService: CiPmeService,
              private identificationService: IdentificationService, private demandeService: DemandeService,
              private activatedRoute: ActivatedRoute
  ) {
    this.navigationEnd = this.router.events.pipe(
      filter((event): event is NavigationEnd   => {
        console.log("Event :::", event);
        
        return event instanceof NavigationEnd;
      })
    );

    this.routePathParam = this.navigationEnd.pipe(
      map(() => this.activatedRoute.root),
      map(root => root.firstChild),
      switchMap(firstChild => {
        console.log('first :::', firstChild);
        
        if(firstChild && firstChild.firstChild){
          const targetRoute = firstChild.firstChild;
          return targetRoute.paramMap.pipe(
            map(paramMap => paramMap.get('idEntreprise'))
          );
        }
        else{
          return of(null)
        }
      })
    );
    }

  ngOnInit(): void {
    console.log('Active ::', this.activatedRoute.root)
    // this.routePathParam = this.activatedRoute.paramMap.pipe(
    //   map(paramMap => paramMap.get('idEntreprise'))
    // );
 
    this.authService.getUserInfos().subscribe(
      data => {
        sessionStorage.setItem('connectedUserData', JSON.stringify(data));
        this.user = data;
        if (this.user.entrepriseId != null){
          this.idEntreprise = this.user?.entrepriseId;
          this.getEntreprise();
        }
      //   if(this.user?.profil?.code == 'ROLE_EXP_PME'){
      //     // this.idEntreprise = this.activatedRoute.snapshot.paramMap.get('idEntreprise');
      //     this.routePathParam.subscribe(
      //       data => {
      //         this.idEntreprise = data ? +data : null;
      //         console.log('ID :::', data);
              
      //         this.getEntreprise()
      //       },
      //       err => console.log(err)
            
      //       );
      //     }
      //     else if(this.user?.profil.code == 'ROLE_ENTR'){
      //       this.idEntreprise = this.user?.entrepriseId;
      //       this.getEntreprise()
      //   }
      //   console.log('User ::', data, 'ID ::', this.idEntreprise);
        
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
        console.log('Entreprise :::', data);
        
        this.getDemandeEnCours(this.entreprise?.id);
      }
    );
  }
  
  getDemandeEnCours(idEntreprise: any){
    this.demandeService.getDemandeOuverte(idEntreprise).subscribe(
      (data: any) => {
        this.demande = data;

        // @ts-ignore
        this.canActivateEligibility = data && data?.status != 6;

        // @ts-ignore
        this.canActivateIndicateur = data && data?.status != 6;

        if(!this.demande && this.user?.profil?.code == 'ROLE_ENTR'){
          this.router.navigate(['/ci-pme/accueil'])
        }
        else if(!this.demande && this.user?.profil?.code == 'ROLE_EXP_PME'){
          this.router.navigate(['/ci-pme/list-pme'])
        }
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
