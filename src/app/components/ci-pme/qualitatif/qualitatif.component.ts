import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QualitatifService } from '../../../services/qualitatif.service';
import Swal from 'sweetalert2';
import { IdentificationService } from 'src/app/services/identification.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { ReferentielService } from 'src/app/services/referentiel.service';
import { DemandeService } from 'src/app/services/demande.service';

declare var $: any;
@Component({
  selector: 'app-qualitatif',
  templateUrl: './qualitatif.component.html',
  styleUrls: ['./qualitatif.component.scss'],
})
export class QualitatifComponent implements OnInit {
  connectedUser: any = JSON.parse(
    <string>sessionStorage.getItem('connectedUserData')
  );
  listParameters: any = [];
  listQuestions: any = [];

  tabIndex: number = 0;
  activeValidateBtn: boolean = false;
  activePrevBtn: boolean = false;
  activeNextBtn: boolean = true;

  entreprise: any;
  scoreFinancier: any = {};

  scores: any = [];
  total: any;

  chartLibelles: any = ['Score Financier/Solvabilité'];
  chartValues: ChartDataSets[] = [];
  radarChartType: ChartType = 'radar';
  radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        min: 0,
        max: 5,
        stepSize: 1,
      },
    },
  };
  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgb(247 131 0 / 50%)',
      borderColor: 'rgb(247 131 0 )',
    },
  ];
  edit: boolean = false;

  commentaire: string = '';
  recommendation: string = '';

  currentParametre: any;
  scoreParametre: any;
  parametre: any;

  answeredParams: number = 0;
  demande: any;
  idEntreprise: any;
  listReponse: any = [];

  constructor(
    private qualitatifService: QualitatifService,
    private idService: IdentificationService,
    private ref: ReferentielService,
    private demandeService: DemandeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    if (this.connectedUser?.profil.code == 'ROLE_EXP_PME') {
      this.idEntreprise =
        this.activatedRoute.snapshot.paramMap.get('idEntreprise');
    } else if (this.connectedUser?.profil.code == 'ROLE_ENTR') {
      this.idEntreprise = this.connectedUser?.entrepriseId;
    }
  }

  ngOnInit(): void {
    this.getParameter();

    if (this.idEntreprise) {
      this.idService.getEntreprise(this.idEntreprise).subscribe(
        (data: any) => {

          this.entreprise = data;

          this.getDemandeEnCours(data?.id);
        },
        (err) => console.log(err)
      );
    }
       
  }

  fillData(demande: any) {
    if (demande?.repQuali) {
      // this.edit = true;
      this.qualitatifService.getScoreQualitatif(demande?.id).subscribe(
        (data: any) => {
          this.scores = data;

          this.setParametreScore(this.listParameters, data);
          this.answeredParams != 0 && this.activeTab('');

          this.total = this.formatNumber(
            data.map((d: any) => d.score).reduce((p: any, c: any) => p + c) /
              data.length,
            1
          );
          let tab = data
            .sort((a: any, b: any) => a.parametre.id - b.parametre.id)
            .map((d: any) => d.score);
          this.chartValues = [
            {
              data: tab,
              label: 'Score qualitatif ',
            },
          ];

          // score final
          this.setScoreFinal();

          this.fillReponses(this.demande?.id);
        },
        (err) => console.log(err)
      );
    }
  }

  setScoreFinal() {
    this.qualitatifService.getScoreFinal(this.demande?.id).subscribe(
      (data: any) => {
        console.log('Final :: ', data);

        this.total = this.formatNumber(data?.score_final, 1);
        this.scoreFinancier.score_financier = this.formatNumber(
          data?.score_financier,
          1
        );
        this.scoreFinancier.score_final = this.formatNumber(
          data?.score_final,
          1
        );

        const values: any = this.chartValues[0];
        values.data.unshift(data?.score_financier ? data?.score_financier : 0);
      },
      (err) => {
        this.scoreFinancier.score_financier = '0.0';
        const values: any = this.chartValues[0];
        values.data.unshift(0);
        console.log(err);
      }
    );
  }

  getDemandeEnCours(idEntreprise: any) {
    this.demandeService.getDemandeOuverte(idEntreprise).subscribe(
      (data: any) => {
        this.demande = data;
        this.fillData(data);
        console.log('Demande :: ', data);
      },
      (err) => console.log(err)
    );
  }

  editScore(idEntreprise: any) {
    this.edit = true;
    this.tabIndex = 0;
    this.fillReponses(idEntreprise);
  }

  fillReponses(id: any) {
    this.qualitatifService.getReponseParPME(id).subscribe(
      (rep: any) => {
        for (let p of this.listParameters) {
          for (let q of p.questions) {
            rep.forEach((r: any) => {
              if (q.question.id === r.idQuestion) {
                q.reponse = r.id_reponse_quali;
                this.listReponse.push({ idQuestion: q?.question?.id, reponse: r?.id_reponse_quali});
              }
            });

            if (q.reponse == 240) {
              q.chosen = 'Ne sais pas';
            } else if (q.reponse == 241) {
              q.chosen = "Ne s'applique pas";
            }
            for (let r of q.question.listReponsesDTO) {
              if (q.reponse == r.id) {
                q.chosen = r.libelle;
              }
            }
          }
        }
        this.listParameters.sort((a: any, b: any) => a.id - b.id);
      },
      (err) => console.log(err)
    );
  }

  getParameter() {
    this.qualitatifService.getParameter().subscribe((data) => {
      // this.listParameters = data;
      // @ts-ignore
      data.sort((a: any, b: any) => a.id - b.id);

      // @ts-ignore
      data.forEach((item) => {
        item.questions = [];
        this.listParameters.push(item);
        this.chartLibelles.push(item.libelle);
      });
      this.getQuestion();
    });
  }

  getQuestion(): any {
    this.qualitatifService.getQuestion().subscribe((data) => {
      for (let p of this.listParameters) {
        // @ts-ignore
        data.forEach((question) => {
          if (p.id == question.parametreDTO.id) {
            p.questions.push({ question, reponse: '', chosen: '' });
            // this.listQuestions.push({question, reponse: ''});
          }
        });
      }
    });
  }
  
  submitQuestionnaireByParametre(id: any) {
    let payload = {
      idEntreprise: this.idEntreprise,
      listReponse: [],
      idDemande: this.demande?.id,
    };

    
    const p = this.listParameters.find((p: any) => p.id == id);
    for (let q of p.questions) {
      for(let r of this.listQuestions){
        if(q.question.id == r.reponse && !q.reponse){
          //@ts-ignore
          payload.listReponse.push({ idQuestion: q.question.id, reponse: 240 });
        }
      }
      if(q.reponse){
        //@ts-ignore
        payload.listReponse.push({ idQuestion: q.question.id, reponse: parseInt(q.reponse) });
      }
      else{
        //@ts-ignore
        payload.listReponse.push({ idQuestion: q.question.id, reponse: 240 });
      }
    }

    for (let r of payload.listReponse) {
      for (let q of this.listQuestions) {
        //@ts-ignore
        if (r.idQuestion == q.question.id) {
          //@ts-ignore
          r.reponse = parseInt(q.reponse);
          // payload.listReponse.push({
          //   // @ts-ignore
          //   idQuestion: q.question.id, reponse: parseInt(q.reponse)
          // });
        }
      }
    }

    this.qualitatifService.saveQualitatifByParametre(id, payload).subscribe(
      (data) => {
        this.successMsgBox('Réponses enregistrées avec succés !');
        this.setParametreScore(this.listParameters, [data]);
      },
      (err) => this.errorMsgBox(err.error)
    );
  }

  onSelectReponse(event: any, question: any) {
    const reponse = event?.target?.value;

    for (let p of this.listParameters) {
      for (let q of p.questions) {
        for (let r of q.question.listReponsesDTO) {
          if (r.id == reponse) {
            q.chosen = r.libelle;
            // this.listReponse.push({idQuestion: q.question.id, reponse: r.reponse });
          }
          // else{
          //   this.listReponse.push({idQuestion: q.question.id, reponse: '' });
          // }
        }
        if (reponse == 240 && q.question.id == question.question.id) {
          q.chosen = 'Ne sais pas';
        } else if (reponse == 241 && q.question.id == question.question.id) {
          q.chosen = "Ne s'applique pas";
        }
      }
    }
    this.listQuestions.push({ ...question, reponse: event.target.value });
  }

  activeTab(direction: any) {
    const elt = $(
      'a[class="nav-link active"][role="tab"][data-toggle="pill"] > span[class*="badge"]'
    );
    elt.parent().removeClass('active');    
    const i = parseInt(elt[0]?.innerText);
    $('#P' + i).removeClass('active');
    if (direction === 'next') {
      const index = i ? i + 1: this.tabIndex + 2;
      const next = $(
        'a[href*="#P' + index + '"] > span[class*="badge"]'
      ).parent();
      next.trigger('click');
      this.tabIndex += 1;
      console.log('next', this.tabIndex);
    } else if (direction === 'previous') {
      const index = i - 1;
      const next = $(
        'a[href*="#P' + index + '"] > span[class*="badge"]'
      ).parent();
      this.tabIndex -= 1;
      next.trigger('click');
      console.log('prev', this.tabIndex);
    } else if (direction.includes('P')) {
      this.tabIndex = direction[1] - 1;
    } else {
      const next = $(
        'a[href*="#P' + this.answeredParams + '"] > span[class*="badge"]'
      ).parent();
      next.trigger('click');
      this.tabIndex = this.answeredParams - 1;
    }
  }

  generateReport() {
    const id = this.demande?.id;
    const payload: any = {
      commentaire: this.commentaire,
      recommendation: this.recommendation,
    };
    this.idService.generateReport(id, payload).subscribe(
      (data: any) => {
        this.idService.createDownloadPdfFileLink(
          data.name,
          data.content,
          data.name.split('.')[1]
        );
        this.commentaire = '';
        this.recommendation = '';
        this.successMsgBox('Le rapport a été bien généré.');
      },
      (err) => console.log(err)
    );
  }

  setParametreScore(parametres: any, scores: any) {
    for (let p of parametres) {
      for (let s of scores) {
        if (p.id == s.parametre.id) {
          p.score = this.formatNumber(s.score, 1);
        }
        if (p.id == s.parametre.id) {
          this.answeredParams++;
        }
      }
    }
  }

  closeDemande() {
    this.demandeService.closeDemande(this.demande?.id).subscribe(
      (data: any) => {
        this.successMsgBox('La demande de scoring a été bien cloturée.', false);
        this.generateReport();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/ci-pme/accueil/', this.entreprise.id]);
          });
      },
      (err) => console.log(err)
    );
  }

  getQuestionSymbol(index: number) {
    const alpha: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alpha[index];
  }

  formatNumber(num: any, digits: any) {
    var re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
      m = num.toString().match(re);
    return m
      ? parseFloat(m[1])
      : num.valueOf().toString().includes('.')
      ? num.valueOf()
      : num.valueOf() + '.0';
  }

  successMsgBox(msg: any, reload: boolean = true) {
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 5000,
    }).then(() => {
      if (reload) window.location.reload();
    });
  }

  errorMsgBox(msg: any) {
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 5000,
    });
  }
}
