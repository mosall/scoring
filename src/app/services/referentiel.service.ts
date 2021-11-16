import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor(private http: HttpClient) { }

  getListSecteur(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + '/api/referentiel/SecteurActivite', AppSettings.httpOptions);
  }

  getListFormJuridique(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + '/api/referentiel/FormeJuridique', AppSettings.httpOptions);
  }
}
