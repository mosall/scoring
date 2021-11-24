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

  getReponseParPME(idEntreprise: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL+'/api/traitement/questionnaire/liste-reponses/'+idEntreprise+'/qualitatif', AppSettings.httpOptions);
  }
  
  getScoreQualitatif(idEntreprise: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL+'/api/score/qualitatif/'+idEntreprise, AppSettings.httpOptions);
  }
}
