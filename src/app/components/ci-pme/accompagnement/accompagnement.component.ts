import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccompagnementService } from "src/app/services/accompagnement.service";
import { AuthService } from "src/app/services/auth.service";
import { DemandeService } from "src/app/services/demande.service";
import Swal from "sweetalert2";

@Component({
	selector: 'app-accompagnent',
	templateUrl: './accompagnement.component.html',
	styleUrls: ['./accompagnement.component.scss']
})
export class AccompagnementComponent  implements OnInit{
	
	listeQuestionAvecReponseNon: any;
	idDemandeScoring: number ;
	demandeAccompagnement: any;
	lastDemande: any;
	user: any;
	
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute, 
		private accompagnementService: AccompagnementService,
		private demandeScoringService: DemandeService,
		private authService: AuthService
	) {
		let param = this.activatedRoute.snapshot.paramMap.get('idDemandeScoring');	
		this.idDemandeScoring = param ? +param : 0;
	}

	ngOnInit(): void {
		this.getUserInfos();
		this.getListQuestionAvecReponseNon(this.idDemandeScoring);
		this.getDemandeScoring(this.idDemandeScoring);
		this.getDemandeAccompagnement(this.idDemandeScoring);
	}

	getUserInfos(){
		this.authService.getUserInfos().subscribe(
			data => {
				this.user = data;
				console.log('User ::', data);
				
			},
			err => console.log(err)
		);
	}

	getDemandeScoring(idDemandeScoring: number){
		this.demandeScoringService.getDemandeScoringById(idDemandeScoring).subscribe(
			data => {
				this.lastDemande = data;
				console.log('Demande :: ', data);
				
			},
			err => console.log(err)
		);
	}

	getDemandeAccompagnement(idDemandeScoring: number){
		this.accompagnementService.getAccompagnementByDemandeScoring(idDemandeScoring).subscribe(
			data => {
				this.demandeAccompagnement = data;
				console.log('Accomp. :: ', data);
				
				if( this.demandeAccompagnement?.questionnaireAjoute){
					this.getReponseAccompagnement(this.demandeAccompagnement?.id);
				}
			},
			err => console.log(err)			
		);
	}

	getListQuestionAvecReponseNon(idDemandeScoring: number){
		this.accompagnementService.getListQuestionAvecReponseNon(idDemandeScoring).subscribe(
			(data: any) =>{
				this.listeQuestionAvecReponseNon = data.map( (q: any) => ({ question: q, accompagnement: ''}));
			},
			err => console.log(err)
		);
	}

	getReponseAccompagnement(idDemandeAccompagnement: number){
		this.accompagnementService.getListeReponseAccompagnement(idDemandeAccompagnement).subscribe(
			(data: any) => {
				for( let q of this.listeQuestionAvecReponseNon){
					for( let r of data){
						if( r.questionEligibilite == q?.question?.id){
							q.accompagnement = r?.accompagnement;
						}
					}
				}
			},
			err => console.log(err)			
		);
	}

	submitQuestionnaire(){
		const payload = {
			idDemandeAccompagnement: this.demandeAccompagnement?.id,
			reponses: []
		}
		for(let q of this.listeQuestionAvecReponseNon){
			// @ts-ignore
			payload.reponses.push({idQuestion: q?.question?.id, accompagnement: q.accompagnement});
		}

		this.accompagnementService.saveReponseAccompagnement(payload).subscribe(
			data => {
				this.successMsgBox("Le questionnaire d'accompagnement a été envoyé avec succès:")
			},
			err => console.log()			
		);
	}

	sendAccompagnement(){
		this.accompagnementService.sendAccompagnement(this.demandeAccompagnement?.id).subscribe(
			data => {
				this.successMsgBox('La demande d\'accompagnement a été bien envoyée.');
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
	
	  errorMsgBox(msg: any, noneligible = true){
		Swal.fire({
		  icon: 'warning',
		  text: msg,
		  showConfirmButton: false,
		  timer: 5000
		}).then(() => {
		  if(!noneligible){
			window.location.reload()
		  }
		  else{
			this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
			  this.router.navigate(['/ci-pme/accueil'])
			});
			  
		  }
		});
	  }
}