import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppSettings } from "../settings/app.settings";

@Injectable({
	providedIn: 'root'
})
export class DemandeService {
  
	
	private baseUrl: string = AppSettings.CIPME_SCORING_API_URL+"/api/demandes"
	
	constructor(
		private http: HttpClient
	) {}
		
	getDemandeOuverte(idEntreprise: any){
		return this.http.get(this.baseUrl+"/"+idEntreprise+"/ouverte", AppSettings.httpOptions);
	}
	
	createDemande(idEntreprise: any){
		return this.http.post(this.baseUrl+"/"+idEntreprise, {}, AppSettings.httpOptions);
	}

	sendDemande(id: any) {
		return this.http.get(this.baseUrl+'/'+id+'/envoyer', AppSettings.httpOptions);
	}

	receiveDemande(id: any) {
		return this.http.get(this.baseUrl+'/'+id+'/receptionner', AppSettings.httpOptions);
	}
	
	rejectDemande(id: any, data: any) {
		return this.http.post(this.baseUrl+'/'+id+'/rejet', data, AppSettings.httpOptions);
	}

	closeDemande(id: any){
		return this.http.get(this.baseUrl+'/'+id+'/cloture', AppSettings.httpOptions);
	}

	getLastClosedDemande(idEntreprise: any) {
		return this.http.get(this.baseUrl+'/'+idEntreprise+'/last-closed', AppSettings.httpOptions);
	}
	
	getDemandeScoringById(idDemandeScoring: number){
		return this.http.get(this.baseUrl+'/'+idDemandeScoring, AppSettings.httpOptions);
	}
}