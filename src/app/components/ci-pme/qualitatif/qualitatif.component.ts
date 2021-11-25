import { Component, OnInit } from '@angular/core';
import {QualitatifService} from "../../../services/qualitatif.service";
import Swal from "sweetalert2";
declare var $: any;
@Component({
  selector: 'app-qualitatif',
  templateUrl: './qualitatif.component.html',
  styleUrls: ['./qualitatif.component.scss']
})
export class QualitatifComponent implements OnInit {
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));
  listParameters: any = [];
  listQuestions: any = [];

  constructor(private qualitatifService: QualitatifService) { }

  ngOnInit(): void {
    this.getParameter();
  }

  getParameter(){
    this.qualitatifService.getParameter().subscribe(
      data => {
        // this.listParameters = data;
        // @ts-ignore
        data.sort((a: any, b: any) => a.id > b.id);

        // @ts-ignore
        data.forEach(item => {
          item.questions = [];
          this.listParameters.push(item)
        });

        this.getQuestion();
      }
    );
  }

  getQuestion(): any{
    this.qualitatifService.getQuestion().subscribe(
      data => {
        for (let p of this.listParameters){
          // @ts-ignore
          data.forEach(question => {
            if (p.id == question.parametreDTO.id){
              p.questions.push({question, reponse: ''});
            }
          });
        }
      },
    );
  }

  submitQuestionnaire(){
    let payload = {
      idEntreprise: this.connectedUser?.entrepriseId,
      listReponse: []
    };

    for (let q of this.listQuestions){
      payload.listReponse.push({
        // @ts-ignore
        idQuestion: q.id, reponse: q.reponse
      });
    }

    this.qualitatifService.saveQualitatif(payload).subscribe(
      data => this.successMsgBox('Réponses enregistrées avec succés !'),
      err => this.errorMsgBox(err.error)
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
