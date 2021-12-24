import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {IdentificationService} from "../../services/identification.service";
import { AppSettings } from 'src/app/settings/app.settings';
import {CiPmeService} from "../../services/ci-pme.service";

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

  constructor(private authService: AuthService, private router: Router, private ciPmeService: CiPmeService,
              private identificationService: IdentificationService,) { }

  ngOnInit(): void {
    this.authService.getUserInfos().subscribe(
      data => {
        sessionStorage.setItem('connectedUserData', JSON.stringify(data));
        this.user = data;
        if (this.user.entrepriseId != null){
          this.getEntreprise();
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

        this.ciPmeService.getDemandeNonCloturer(this.entreprise?.id).subscribe(
          data => {
            // @ts-ignore
            this.canActivateEligibility = data?.status != 6;

            // @ts-ignore
            this.canActivateIndicateur = data?.status != 6;
          }
        );
      }
    )
  }

}
