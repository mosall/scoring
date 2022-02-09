import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {IdentificationService} from "../../services/identification.service";
import { AppSettings } from 'src/app/settings/app.settings';
import {CiPmeService} from "../../services/ci-pme.service";
import { DemandeService } from 'src/app/services/demande.service';
import Swal from 'sweetalert2';

import { filter, map, switchMap } from 'rxjs/operators'
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AccompagnementService } from 'src/app/services/accompagnement.service';

declare var $: any;
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
  updatePasswordForm: any;
  disableCloseModal: boolean = false;
  lastDemande: any;
  demandeAccompagnement: any;
  idDemandeScoring: number | null = null;

  // routePathParam: Observable<string|null>;
  // navigationEnd: Observable<NavigationEnd>;


  constructor(private authService: AuthService, 
      private router: Router, 
      private ciPmeService: CiPmeService,
      private identificationService: IdentificationService, 
      private demandeService: DemandeService,
      private activatedRoute: ActivatedRoute,
      private fb: FormBuilder,
      private accompagnementService: AccompagnementService
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
                      map(paramMap => (paramMap.get('idEntreprise') ? {id: paramMap.get('idEntreprise'), entreprise: true} :  {id: paramMap.get('idDemandeScoring'), entreprise: false}) )
                    );
       })
      )
      .subscribe(
        data => {
          console.log("Param :: ", data);
          
          if(data.entreprise){
            this.idEntreprise = data?.id? +data?.id : 0;
            if(this.idEntreprise){
              this.getEntreprise(this.idEntreprise);
            }
          }
          else{
            this.idDemandeScoring = data?.id? +data?.id : 0;
            this.getDemandeScoring(this.idDemandeScoring);
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
        this.getEntreprise(this.idEntreprise);
        if(this.user?.actif == 0){
          $('#updatePwd').modal({
            backdrop: 'static',
            keyboard: false,
            focus: true
          })
          this.disableCloseModal = true;
        }
        
      }
      );
      this.initForm();
  }

  initForm(){
    this.updatePasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordConfirm: ['', [Validators.required]],
    });
  }

  onSubmit(){
    if(this.updatePasswordForm.inValid)
      return;

    const data = {
      password: this.updatePasswordForm.get('password').value,
      newPassword: this.updatePasswordForm.get('newPassword').value,
      newPasswordConfirm: this.updatePasswordForm.get('newPasswordConfirm').value,
    }
    console.log(this.updatePasswordForm);
    
    this.authService.updatePassword(this.user?.id, data, [
      (data: any) => {
        $('#updatePwd').modal('hide');
        this.successMsgBox('Votre mot de passe a été modifié avec succès.');
        this.logout();
      },
      (err: HttpErrorResponse) => {
        this.errorMsgBox(err.error);
        console.log(err);
      }
    ]);

  }

  logout(){
    const token = sessionStorage.getItem('connectedUser');
    if (token != null){
      sessionStorage.removeItem("connectedUser");
      // this.router.navigate(['/'])
      window.location.href = AppSettings.UM_HOME;
    }
  }

  getEntreprise(idEntreprise: number){
    this.identificationService.getEntreprise(idEntreprise).subscribe(
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

        if(!this.demande){
          this.getLastClosedDemande(idEntreprise);
        }

      },
      err => console.log(err)
    );
  }

  getLastClosedDemande(idEntreprise: any){
    this.demandeService.getLastClosedDemande(idEntreprise).subscribe(
      (data: any) => {
        this.lastDemande = data;
        console.log('Last closed ci ::', data); 
        this.canActivateEligibility = data && data?.status == 7;
        this.getDemandeAccompagnent(this.lastDemande?.id);       
      },
      err => console.log(err)
    );
  }

  getDemandeAccompagnent(idDemandeScoring: number){
    this.accompagnementService.getAccompagnementByDemandeScoring(idDemandeScoring).subscribe(
      (data: any) => {
        this.demandeAccompagnement = data;
        console.log('Demande accomp. :: ', data);
        
      },
      err => console.log(err)
    );
  }

  getDemandeScoring(idDemandeScoring: number){
		this.demandeService.getDemandeScoringById(idDemandeScoring).subscribe(
			data => {
				this.lastDemande = data;
        console.log('CI Demande sc ::', data);
        this.getEntreprise(this.lastDemande?.entrepriseDTO?.id);
        
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
  
  relaunchDemande(){
    this.demandeService.relaunchDemande(this.lastDemande?.id).subscribe(
      data => {
        this.successMsgBox('Une demande de scoring a été bien relancée.');
      },
      err => console.log(err)
    );
  }
  
  createAccompagnement(){
    this.accompagnementService.createAccompagnement(this.lastDemande?.id).subscribe(
      data => {
        this.successMsgBoxWithoutReload('Une demande d\'accompagnement a été bien créée.');
        this.goTo('/ci-pme/demandes-accompagnements/', this.lastDemande?.id)
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
  goToAccueil(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
      this.router.navigate(['/ci-pme/accueil', this.demande?.entrepriseDTO?.id ? this.demande?.entrepriseDTO?.id : this.lastDemande?.entrepriseDTO?.id]);
    });
  }

  togglePasswordView(id: string) {
    const passInput = document.getElementById(id) as HTMLInputElement;
    (passInput.type === 'password') ? ( passInput.type = 'text') :   passInput.type = 'password';
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
  successMsgBoxWithoutReload(msg: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    });
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
