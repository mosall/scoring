import { Component, OnInit } from '@angular/core';
import {QualitatifService} from "../../../services/qualitatif.service";
import Swal from "sweetalert2";
import { IdentificationService } from 'src/app/services/identification.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';


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

  tabIndex: number = 0;

  entreprise: any;

  
  scores: any = [];
  total: string = '';
  
  chartLibelles: any =  [];
  chartValues: ChartDataSets[] = [];
  radarChartType: ChartType = 'radar';
  radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    { 
      backgroundColor: 'rgb(247 131 0 / 50%)',
      borderColor: 'rgb(247 131 0 )',
    },

  ];
  edit: boolean = false;

  constructor(
    private qualitatifService: QualitatifService,
    private idService: IdentificationService
  ) { }

  ngOnInit(): void {
    this.getParameter();
        
    if(this.connectedUser?.entrepriseId){
      this.idService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
        (data: any) =>{ 
          this.entreprise = data;         
          if(data.repQuali){
            // this.edit = true;
            this.qualitatifService.getScoreQualitatif(data.id).subscribe(
              (data: any) => {
                this.scores = data;
                this.total = (data.map((d: any) => d.score).reduce((p:any, c: any) => p + c) / data.length).toFixed(1);
                let tab = data.map ((d: any) => d.score);
                this.chartValues = [{
                  data: tab,
                  label: 'Score qualitatif '
                }];
                console.log('data', this.chartValues);
                
              },
              err => console.log(err)
            );
          }
        },
        err => console.log(err)
        );
      }
    }
    
    editScore(idEntreprise: any){
      this.edit = true;
      this.qualitatifService.getReponseParPME(idEntreprise).subscribe(
        (rep: any) => {                
          for(let p of this.listParameters){
            for(let q of p.questions){
              rep.forEach((r: any) => {
                if( q.question.id === r.idQuestion){
                  q.reponse = r.id_reponse_quali;
                } 
              });
            }
          }
          console.log('Edit',this.listParameters);
          
        },
        err => console.log(err)              
      );
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
          this.chartLibelles.push(item.libelle)
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
              // this.listQuestions.push({question, reponse: ''});
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
      console.log(q);
      
      payload.listReponse.push({
        // @ts-ignore
        idQuestion: q.question.id, reponse: parseInt(q.reponse)
      });
    }
      
    this.qualitatifService.saveQualitatif(payload).subscribe(
      data => this.successMsgBox('Réponses enregistrées avec succés !'),
      err => this.errorMsgBox(err.error)
    );
  }

  onSelectReponse(event: any, question: any){    
    this.listQuestions.push({...question, reponse: event.target.value});
  }

  activeTab(direction: any){
    let elt = $('a[class="nav-link active"][role="tab"][data-toggle="pill"] > span[class*="badge"]');
    elt.parent().removeClass('active');
    let i = parseInt(elt[0].innerText)
    $("#P"+i).removeClass('active');
    if(direction === 'next'){
      let next = $('a[href*="#P'+(i + 1)+'"] > span[class*="badge"]').parent()
      next.click()
      this.tabIndex++;
      console.log('next', next);
    }
    if(direction === 'previous'){
      let next = $('a[href*="#P'+(i - 1)+'"] > span[class*="badge"]').parent()
      next.click()
      this.tabIndex--;
      console.log('previous', next);
    } 
    else{
      this.tabIndex = (direction[1] - 1)
    }   
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
