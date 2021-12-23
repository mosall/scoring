import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class QualitatifService {

  constructor(private http: HttpClient) { }

  getParameter(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/parametres`, AppSettings.httpOptions);
  }

  getQuestionByParameter(idParameter: any){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/parametre/${idParameter}`, AppSettings.httpOptions);
  }

  getQuestion(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/qualitatif`, AppSettings.httpOptions);
  }

  saveQualitatif(payload: any){
    return this.http.post(AppSettings.CIPME_SCORING_API_URL + '/api/traitement/questionnaire/qualitatif', payload, AppSettings.httpOptions);
  }
  
  saveQualitatifByParametre(idParameter: any, payload: any){
    return this.http.post(AppSettings.CIPME_SCORING_API_URL + '/api/traitement/questionnaire/qualitatif/parametres/'+idParameter, payload, AppSettings.httpOptions);
  }

  getReponseParPME(idDemande: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL+'/api/traitement/questionnaire/liste-reponses/'+idDemande+'/qualitatif', AppSettings.httpOptions);
  }
  
  getScoreQualitatif(idDemande: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL+'/api/score/qualitatif/'+idDemande, AppSettings.httpOptions);
  }
  getScoreParametreQualitatif(idDemande: any, parametreId: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL+'/api/score/qualitatif/'+idDemande+"/parametres/"+parametreId, AppSettings.httpOptions);
  }

  getScoreFinal(idDemande: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL+"/api/score/final/"+idDemande, AppSettings.httpOptions);
  }
}
