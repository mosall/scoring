import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {IdentificationService} from "../../services/identification.service";
import { AppSettings } from 'src/app/settings/app.settings';
import { DemandeService } from 'src/app/services/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ci-pme',
  templateUrl: './ci-pme.component.html',
  styleUrls: ['./ci-pme.component.scss']
})
export class CiPmeComponent implements OnInit {
  user: any = null;
  entreprise: any = null;
  currentYear = new Date().getFullYear();
  demande: any;
  constructor(private authService: AuthService, private router: Router,
              private identificationService: IdentificationService,
              private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.authService.getUserInfos().subscribe(
      data => {
        sessionStorage.setItem('connectedUserData', JSON.stringify(data));
        this.user = data;
        if (this.user.entrepriseId != null){
          this.getEntreprise();
          this.getDemandeEnCours(this.user?.entrepriseId);
        }
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
    this.identificationService.getEntreprise(this.user?.entrepriseId).subscribe(
      data => {
        this.entreprise = data;
        console.log('Entreprise :: ', data);
        
      }
    )
  }
  
  getDemandeEnCours(idEntreprise: any){
    this.demandeService.getDemandeOuverte(idEntreprise).subscribe(
      (data: any) => {
        this.demande = data;
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
