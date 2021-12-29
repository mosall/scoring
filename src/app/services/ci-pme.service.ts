import { Injectable } from '@angular/core';
import {AppSettings} from "../settings/app.settings";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CiPmeService {

  constructor(private http: HttpClient) { }

  getDemandeNonCloturer(idEntreprise: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL + `/api/demandes/entreprise/${idEntreprise}`, AppSettings.httpOptions);
  }

  getListPme(){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL+"/api/entreprises/demandes/envoyees", AppSettings.httpOptions);
  }
}
