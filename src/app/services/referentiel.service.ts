import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor(private http: HttpClient) { }

  getListSecteur(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + '/api/referentiel/secteurs-activites', AppSettings.httpOptions);
  }

  getListFormJuridique(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + '/api/referentiel/formes-juridiques', AppSettings.httpOptions);
  }
  
  getPonderations(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + '/api/ponderations', AppSettings.httpOptions);    
  }
  
  getNiveauEtude(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + '/api/referentiel/niveaux-etudes', AppSettings.httpOptions);    
  }
}
