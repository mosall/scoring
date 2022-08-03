import { HttpHeaders } from "@angular/common/http";

const BACK_IP: string = 'http://217.182.185.176';

export const environment = {
  production: true,

  CIPME_ADMINISTRATION_API_URL: BACK_IP+':3000/administration',
  CIPME_SCORING_API_URL: BACK_IP+':4000/scoring',

  UM_URL: BACK_IP+":3000/administration/api/auth",
  UM_TOKEN_URL: BACK_IP+":3000/administration/oauth/token",


  UM_HOME: BACK_IP+"/administration/login",

  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
};
