import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class DemandeService {
  
	
	private baseUrl: string = environment.CIPME_SCORING_API_URL+"/api/demandes"
	
	constructor(
		private http: HttpClient
	) {}
		
	getDemandeOuverte(idEntreprise: any){
		return this.http.get(this.baseUrl+"/"+idEntreprise+"/ouverte", environment.httpOptions);
	}
	
	createDemande(idEntreprise: any){
		return this.http.post(this.baseUrl+"/"+idEntreprise, {}, environment.httpOptions);
	}

	sendDemande(id: any) {
		return this.http.get(this.baseUrl+'/'+id+'/envoyer', environment.httpOptions);
	}

	receiveDemande(id: any) {
		return this.http.get(this.baseUrl+'/'+id+'/receptionner', environment.httpOptions);
	}
	
	rejectDemande(id: any, data: any) {
		return this.http.post(this.baseUrl+'/'+id+'/rejet', data, environment.httpOptions);
	}

	closeDemande(id: any){
		return this.http.get(this.baseUrl+'/'+id+'/cloture', environment.httpOptions);
	}

	getLastClosedDemande(idEntreprise: any) {
		return this.http.get(this.baseUrl+'/'+idEntreprise+'/last-closed', environment.httpOptions);
	}
	
	getDemandeScoringById(idDemandeScoring: number){
		return this.http.get(this.baseUrl+'/'+idDemandeScoring, environment.httpOptions);
	}

	relaunchDemande(id: number){
		return this.http.get(this.baseUrl+'/'+id+'/relancer', environment.httpOptions);
	}
}