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

  uploadLogo(id: any, files: any){
    return this.http.post(AppSettings.CIPME_SCORING_API_URL + `/api/entreprises/${id}/attachments`, files);
  }

  getEntreprises(id: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL + '/api/entreprises', AppSettings.httpOptions);
  }

  getDirigeant(id: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL + '/api/dirigeants/entreprise/' + id, AppSettings.httpOptions);
  }

  getEntreprise(id: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL + '/api/entreprises/'+id, AppSettings.httpOptions);
  }

  getLogo(id: any){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL + `/api/entreprises/${id}/attachments`, AppSettings.httpOptions);
  }

  generateReport(id: any, payload: any){
    return this.http.post(AppSettings.CIPME_SCORING_API_URL + '/api/entreprises/'+id+'/rapport', payload, AppSettings.httpOptions);
  }

  createDownloadPdfFileLink( filename: any, byte: any, extension: any){
    const blob = new Blob([this.base64ToArrayBuffer(byte)], {type: 'application/' + extension});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  private base64ToArrayBuffer(base64: any) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  getListPme(){
    return this.http.get(AppSettings.CIPME_SCORING_API_URL + '/api/entreprises');
  }
}
