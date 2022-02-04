import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  getUserInfos(){
    return this.httpClient.get(AppSettings.UM_URL + '/me', AppSettings.httpOptions);
  }

  updatePassword(id: number, data: any, cbs: any){
    this.httpClient.patch(`${AppSettings.UM_URL}/users/${id}/update-password`, data, AppSettings.httpOptions).subscribe(...cbs);
  }
}
