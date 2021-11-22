import { Component, OnInit } from '@angular/core';
import {EligibiliteService} from "../../../services/eligibilite.service";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup} from "@angular/forms";
declare var $: any;
@Component({
  selector: 'app-eligibilite',
  templateUrl: './eligibilite.component.html',
  styleUrls: ['./eligibilite.component.css']
})
export class EligibiliteComponent implements OnInit {

  listQuestions: any = [];
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));

  constructor(private eligibilityService: EligibiliteService) { }

  ngOnInit(): void {
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

    )
  }

  submitQuestionnaire(){
    let payload = {
      idEntreprise: 35,
      listReponse: []
    };

    for (let q of this.listQuestions){
      payload.listReponse.push({
        // @ts-ignore
        idQuestion: q.id, reponse: q.reponse
      });
    }

    this.eligibilityService.saveEligibility(payload).subscribe(
      data => this.successMsgBox('Réponses enregistrées avec succés !'),
      err => this.errorMsgBox(err.error)
    );
  }

  successMsgBox(msg: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 1500
    }).then(
      ()=> window.location.reload()
    );
  }

  errorMsgBox(msg: any){
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 2500
    });
  }

}
