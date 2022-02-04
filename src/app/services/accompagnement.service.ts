import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppSettings } from "../settings/app.settings";

@Injectable({
	providedIn: 'root'
})
export class AccompagnementService{

	private baseUrl: string = AppSettings.CIPME_SCORING_API_URL;

	constructor(
		private http: HttpClient
	){}

	// getAccompagnementById(id: number){
	// 	this.http.get(`${this.baseUrl}/api/demande-accompagnement/${id}`, AppSettings.httpOptions);
	// }

	getListQuestionAvecReponseNon(idDemande: number){
		return this.http.get(AppSettings.CIPME_SCORING_API_URL+'/api/traitement/questionnaire/liste-questions-non-reponses/'+idDemande, AppSettings.httpOptions);
	}

	getAccompagnementByDemandeScoring(id: number){
		return this.http.get(`${this.baseUrl}/api/demandes/${id}/demandes-accompagnements`, AppSettings.httpOptions);
	}
	
	getAccompagnementByEntreprise(id: number){
		return this.http.get(`${this.baseUrl}/api/entreprises/${id}/demandes-accompagnements`, AppSettings.httpOptions);
	}
	
	createAccompagnement(idDemandeScoring: any){
		return this.http.post(`${this.baseUrl}/api/demandes-accompagnements/${idDemandeScoring}`, null, AppSettings.httpOptions);
	}
	
	sendAccompagnement(idDemandeAccompagnement: any){
		return this.http.patch(`${this.baseUrl}/api/demandes-accompagnements/${idDemandeAccompagnement}/envoyer`, null, AppSettings.httpOptions);
	}
	
	receiveAccompagnement(idDemandeAccompagnement: any){
		return this.http.patch(`${this.baseUrl}/api/demandes-accompagnements/${idDemandeAccompagnement}/receptionner`, null, AppSettings.httpOptions);
	}
	
	saveReponseAccompagnement(body: any){
		return this.http.post(`${this.baseUrl}/api/traitement/questionnaire/accompagnement/`, body, AppSettings.httpOptions);
	}
	
	getListeReponseAccompagnement(idDemandeAccompagnement: number){
		return this.http.get(`${this.baseUrl}/api/traitement/questionnaire/liste-reponses/accompagnement/${idDemandeAccompagnement}`, AppSettings.httpOptions);
	}
}