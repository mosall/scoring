import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QualitatifService {

  constructor(private http: HttpClient) { }

  getParameter(){
    return this.http.get(environment.CIPME_ADMINISTRATION_API_URL + `/api/parametres`, environment.httpOptions);
  }

  getQuestionByParameter(idParameter: any){
    return this.http.get(environment.CIPME_ADMINISTRATION_API_URL + `/api/questions/parametre/${idParameter}`, environment.httpOptions);
  }

  getQuestion(){
    return this.http.get(environment.CIPME_ADMINISTRATION_API_URL + `/api/questions/qualitatif`, environment.httpOptions);
  }

  saveQualitatif(payload: any){
    return this.http.post(environment.CIPME_SCORING_API_URL + '/api/traitement/questionnaire/qualitatif', payload, environment.httpOptions);
  }
  
  saveQualitatifByParametre(idParameter: any, payload: any){
    return this.http.post(environment.CIPME_SCORING_API_URL + '/api/traitement/questionnaire/qualitatif/parametres/'+idParameter, payload, environment.httpOptions);
  }

  getReponseParPME(idDemande: any){
    return this.http.get(environment.CIPME_SCORING_API_URL+'/api/traitement/questionnaire/liste-reponses/'+idDemande+'/qualitatif', environment.httpOptions);
  }
  
  getScoreQualitatif(idDemande: any){
    return this.http.get(environment.CIPME_SCORING_API_URL+'/api/score/qualitatif/'+idDemande, environment.httpOptions);
  }
  getScoreParametreQualitatif(idDemande: any, parametreId: any){
    return this.http.get(environment.CIPME_SCORING_API_URL+'/api/score/qualitatif/'+idDemande+"/parametres/"+parametreId, environment.httpOptions);
  }

  getScoreFinal(idDemande: any){
    return this.http.get(environment.CIPME_SCORING_API_URL+"/api/score/final/"+idDemande, environment.httpOptions);
  }
}
