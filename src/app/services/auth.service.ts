import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  getUserInfos(){
    return this.httpClient.get(environment.UM_URL + '/me', environment.httpOptions);
  }

  updatePassword(id: number, data: any, cbs: any){
    this.httpClient.patch(`${environment.UM_URL}/users/${id}/update-password`, data, environment.httpOptions).subscribe(...cbs);
  }
}
