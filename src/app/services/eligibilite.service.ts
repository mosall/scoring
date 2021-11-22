import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class EligibiliteService {

  constructor(private http: HttpClient) { }

  getListQuestion(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + '/api/questions/eligibilite', AppSettings.httpOptions);
  }

  saveEligibility(payload: any){
    return this.http.put(AppSettings.CIPME_SCORING_API_URL + '/api/traitement/questionnaire/eligibilite', payload, AppSettings.httpOptions);
  }
}
