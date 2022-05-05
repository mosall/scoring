import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EligibiliteService {

  constructor(private http: HttpClient) { }

  getListQuestion(){
    return this.http.get(environment.CIPME_ADMINISTRATION_API_URL + '/api/questions/eligibilite', environment.httpOptions);
  }

  saveEligibility(payload: any){
    return this.http.put(environment.CIPME_SCORING_API_URL + '/api/traitement/questionnaire/eligibilite', payload, environment.httpOptions);
  }

  getReponseEntreprise(id: any){
    return this.http.get(environment.CIPME_SCORING_API_URL + '/api/traitement/questionnaire/liste-reponses/' + id, environment.httpOptions);
  }
}
