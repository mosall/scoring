import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class AccompagnementService{

	private baseUrl: string = environment.CIPME_SCORING_API_URL;

	constructor(
		private http: HttpClient
	){}

	// getAccompagnementById(id: number){
	// 	this.http.get(`${this.baseUrl}/api/demande-accompagnement/${id}`, environment.httpOptions);
	// }

	getListQuestionAvecReponseNon(idDemande: number){
		return this.http.get(environment.CIPME_SCORING_API_URL+'/api/traitement/questionnaire/liste-questions-non-reponses/'+idDemande, environment.httpOptions);
	}

	getAccompagnementByDemandeScoring(id: number){
		return this.http.get(`${this.baseUrl}/api/demandes/${id}/demandes-accompagnements`, environment.httpOptions);
	}
	
	getAccompagnementByEntreprise(id: number){
		return this.http.get(`${this.baseUrl}/api/entreprises/${id}/demandes-accompagnements`, environment.httpOptions);
	}
	
	createAccompagnement(idDemandeScoring: any){
		return this.http.post(`${this.baseUrl}/api/demandes-accompagnements/${idDemandeScoring}`, null, environment.httpOptions);
	}
	
	sendAccompagnement(idDemandeAccompagnement: any){
		return this.http.patch(`${this.baseUrl}/api/demandes-accompagnements/${idDemandeAccompagnement}/envoyer`, null, environment.httpOptions);
	}
	
	receiveAccompagnement(idDemandeAccompagnement: any){
		return this.http.patch(`${this.baseUrl}/api/demandes-accompagnements/${idDemandeAccompagnement}/receptionner`, null, environment.httpOptions);
	}
	
	cancelAccompagnement(idDemandeAccompagnement: any){
		return this.http.delete(`${this.baseUrl}/api/demandes-accompagnements/${idDemandeAccompagnement}`, environment.httpOptions);
	}

	
	saveReponseAccompagnement(body: any){
		return this.http.post(`${this.baseUrl}/api/traitement/questionnaire/accompagnement/`, body, environment.httpOptions);
	}
	
	getListeReponseAccompagnement(idDemandeAccompagnement: number){
		return this.http.get(`${this.baseUrl}/api/traitement/questionnaire/liste-reponses/accompagnement/${idDemandeAccompagnement}`, environment.httpOptions);
	}
}