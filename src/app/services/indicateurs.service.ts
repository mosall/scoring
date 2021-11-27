import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class IndicateursService {

  constructor(private http: HttpClient) { }

  saveIndicateurs(payload: any){
    return this.http.post(AppSettings.CIPME_SCORING_API_URL + '/api/indicateurs', payload, AppSettings.httpOptions);
  }

  getIndicateurs(id: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL + `/api/entreprises/${id}/indicateurs`, AppSettings.httpOptions);
  }

  getRatio(id: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL + '/api/score/financier/' + id, AppSettings.httpOptions);
  }

  getIndicateurFiles(id: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL + `/api/indicateurs/${id}/attachments`, AppSettings.httpOptions);
  }

  saveIndicateurFile(idIndicateur: any, file: any){
    return this.http.post(AppSettings.CIPME_SCORING_API_URL + `/api/indicateurs/${idIndicateur}/attachments`, file, AppSettings.httpOptions);
  }
}
