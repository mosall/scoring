import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicateursService {

  constructor(private http: HttpClient) { }

  saveIndicateurs(payload: any){
    return this.http.post(environment.CIPME_SCORING_API_URL + '/api/indicateurs', payload, environment.httpOptions);
  }

  getIndicateurs(id: any){
    return this.http.get(environment.CIPME_SCORING_API_URL + `/api/indicateurs/${id}/demande`, environment.httpOptions);
  }

  calculRatio(id: any){
    return this.http.get(environment.CIPME_SCORING_API_URL + '/api/score/financier/' + id, environment.httpOptions);
  }
  
  getRatio(id: any){
    return this.http.get(environment.CIPME_SCORING_API_URL + '/api/score/financier-ratios/' + id, environment.httpOptions);
  }
  
  getIndicateurFiles(id: any){
    return this.http.get(environment.CIPME_SCORING_API_URL + `/api/indicateurs/${id}/attachments`, environment.httpOptions);
  }

  saveIndicateurFile(idIndicateur: any, files: any){
    return this.http.post(environment.CIPME_SCORING_API_URL + `/api/indicateurs/${idIndicateur}/attachments`, files);
  }

  deleteIndicateurFile(idIndicateur: any, idFile: any){
    return this.http.delete(environment.CIPME_SCORING_API_URL + `/api/indicateurs/${idIndicateur}/attachments/${idFile}`, environment.httpOptions);
  }
}
