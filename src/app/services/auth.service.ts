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
}
