import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor(private http: HttpClient) { }

  getListSecteur(){
    return this.http.get(environment.CIPME_ADMINISTRATION_API_URL + '/api/referentiel/secteurs-activites', environment.httpOptions);
  }

  getListFormJuridique(){
    return this.http.get(environment.CIPME_ADMINISTRATION_API_URL + '/api/referentiel/formes-juridiques', environment.httpOptions);
  }
  
  getPonderations(){
    return this.http.get(environment.CIPME_ADMINISTRATION_API_URL + '/api/ponderations', environment.httpOptions);    
  }
  
  getNiveauEtude(){
    return this.http.get(environment.CIPME_ADMINISTRATION_API_URL + '/api/referentiel/niveaux-etudes', environment.httpOptions);    
  }
}
