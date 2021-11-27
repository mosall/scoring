import { Component, OnInit } from '@angular/core';
import {QualitatifService} from "../../../services/qualitatif.service";
import Swal from "sweetalert2";
import { IdentificationService } from 'src/app/services/identification.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { ReferentielService } from 'src/app/services/referentiel.service';


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
  activeValidateBtn: boolean = false;
  activePrevBtn: boolean = false;
  activeNextBtn: boolean = true;

  entreprise: any;
  scoreFinancier: any = {};
  
  scores: any = [];
  total: string = '';
  
  chartLibelles: any =  ['Score Financier/Solvabilité'];
  chartValues: ChartDataSets[] = [];
  radarChartType: ChartType = 'radar';
  radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks:{
        min: 0,
        max: 5,
        stepSize: 1
      }
    }
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
    private idService: IdentificationService,
    private ref: ReferentielService
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
                let tab = data.sort((a:any, b:any) => a.parametre.id - b.parametre.id).map((d: any) => d.score);
                this.chartValues = [{
                  data: tab,
                  label: 'Score qualitatif '
                }];
                // get ponderation
                this.ref.getPonderations().subscribe(
                  (data:any) => {                    
                    for(let s of this.scores){
                      for(let p of data){
                        if(s.parametre.id == p.parametreDTO?.id){
                            // s.ponderation = p.ponderation;
                            // s.value = ((s.score * p.ponderation) / 100).toFixed(1);
                        }
                        // if(p.parametreDTO == null){
                        //   this.scoreFinancier.ponderation = p.ponderation;
                        // }
                      }
                    }
                  },
                  err => console.log(err)
                );
                // score final
                this.qualitatifService.getScoreFinal(this.entreprise?.id).subscribe(
                  (data:any) => {
                    
                    this.total = (data?.score_final).toFixed(1);
                    this.scoreFinancier.score_financier = (data?.score_financier).toFixed(1);
                    this.scoreFinancier.value = ((this.scoreFinancier.score_financier * this.scoreFinancier.ponderation) / 100).toFixed(1);
                    console.log('final', data);
                    
                    const values: any = this.chartValues[0];
                    values.data.unshift(data?.score_financier? data?.score_financier : 0);
                  },
                  err => console.log(err)                  
                );
                
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
          this.listParameters.sort((a: any, b: any) => a.id - b.id);
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
        data.sort((a: any, b: any) => a.id - b.id);

        // @ts-ignore
        data.forEach(item => {
          item.questions = [];
          this.listParameters.push(item)
          this.chartLibelles.push(item.libelle)
        });

        console.log('para', this.listParameters);
        
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
    const elt = $('a[class="nav-link active"][role="tab"][data-toggle="pill"] > span[class*="badge"]');
    elt.parent().removeClass('active');
    const i = parseInt(elt[0].innerText)
    $("#P"+i).removeClass('active');
    if(direction === 'next'){
      const index = i + 1;
      const next = $('a[href*="#P'+index+'"] > span[class*="badge"]').parent();
      next.trigger('click');
      this.tabIndex += 1;
      console.log('next', this.tabIndex);
    }
    else if(direction === 'previous'){
      const index = i - 1;
      const next = $('a[href*="#P'+index+'"] > span[class*="badge"]').parent();
      this.tabIndex -= 1;
      next.trigger('click');
      console.log('prev', this.tabIndex);
    } 
    else{
      this.tabIndex = (direction[1] - 1)
    }     
  }

  open(content: any){

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
