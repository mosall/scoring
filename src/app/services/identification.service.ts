import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {

  constructor(private http: HttpClient) { }

  saveEntreprise(paylaod: any){
    return this.http.post(AppSettings.CIPME_SCORING_API_URL + '/api/entreprises', paylaod, AppSettings.httpOptions);
  }

  saveDirigeant(payload: any){
    return this.http.post(AppSettings.CIPME_SCORING_API_URL + '/api/dirigeants', payload, AppSettings.httpOptions);
  }
}
