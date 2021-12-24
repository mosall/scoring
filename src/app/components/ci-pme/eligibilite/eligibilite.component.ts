import { Component, OnInit } from '@angular/core';
import {EligibiliteService} from "../../../services/eligibilite.service";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IdentificationService} from "../../../services/identification.service";
import {AuthService} from "../../../services/auth.service";
import {CiPmeService} from "../../../services/ci-pme.service";
import { DemandeService } from 'src/app/services/demande.service';
declare var $: any;
@Component({
  selector: 'app-eligibilite',
  templateUrl: './eligibilite.component.html',
  styleUrls: ['./eligibilite.component.css']
})
export class EligibiliteComponent implements OnInit {

  listQuestions: any = [];
  reponseQuestionnaire: any = [];
  entreprise: any = [];
  demande: any = [];
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));

  constructor(private eligibilityService: EligibiliteService, private authService: AuthService, private ciPmeService: CiPmeService,
              private identificationService: IdentificationService,
              private demandeService: DemandeService
              ) { }

  ngOnInit(): void {
    this.getEntreprise();
    this.getListQuestion();
  }

  getListQuestion(){
    this.eligibilityService.getListQuestion().subscribe(
      data => {
        let controlConfig: any = [];
        // @ts-ignore
        for (let q of data){
          this.listQuestions.push({id: q.id, code: q.code, libelle: q.libelle, reponse: ''});
        }
      }
    );
  }

  getDemandeEnCours(idEntreprise: any){
    this.demandeService.getDemandeOuverte(idEntreprise).subscribe(
      (data: any) => {
        this.demande = data;
        console.log('Demande :: ', data);
        if(this.demande?.repEli){
            this.getReponse(this.demande?.id);
          }
      },
      err => console.log(err)      
    );
  }

  submitQuestionnaire(){
    let payload = {
      idEntreprise: this.connectedUser?.entrepriseId,
      idDemande: this.demande?.id,
      listReponse: []
    };

    for (let q of this.listQuestions){
      payload.listReponse.push({
        // @ts-ignore
        idQuestion: q.id, reponse: q.reponse
      });
    }
    if(this.connectedUser?.entrepriseId){
      this.eligibilityService.saveEligibility(payload).subscribe(
        data => {
          // this.getEntreprise();
          this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
            (data: any) => {
              if (data?.eligible){
                this.successMsgBox('Votre PME est éligible !');
              }
              else {
                this.errorMsgBox('Votre PME n\'est pas éligible !');
              }
            },
            err => {console.log(err);}
          );
        },
        err => this.errorMsgBox(err.error)
      );
    }
    else {
      this.errorMsgBox('Veuillez identifier l\'entreprise avant de répondre au questionnaire.')
    }
  }

  getEntreprise() {
    if(this.connectedUser?.entrepriseId){
      this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
        (data: any) => {
          // @ts-ignore
          this.entreprise = data;

          this.ciPmeService.getDemandeNonCloturer(this.entreprise?.id).subscribe(
            data => {
              this.demande = data;
              // @ts-ignore
              if(data?.repEli){
                // @ts-ignore
                this.getReponse(data?.id);
              }
            }
          );
        }
      );
    }
  }

  getReponse(idDemande: any){
    this.eligibilityService.getReponseEntreprise(idDemande).subscribe(
      data => {
        this.reponseQuestionnaire = data;

        for (let q of this.listQuestions){
          // @ts-ignore
          const question = data.find(_question => _question.idQuestion == q.id);
          q.reponse = question.reponse_eligibilite;
        }
      }
    );
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
