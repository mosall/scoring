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
}
