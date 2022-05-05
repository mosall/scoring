import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiPmeService {

  constructor(private http: HttpClient) { }

  getDemandeNonCloturer(idEntreprise: any){
    return this.http.get(environment.CIPME_SCORING_API_URL + `/api/demandes/entreprise/${idEntreprise}`, environment.httpOptions);
  }

  getListPme(){
    return this.http.get(environment.CIPME_SCORING_API_URL+"/api/entreprises/demandes/envoyees", environment.httpOptions);
  }
}
