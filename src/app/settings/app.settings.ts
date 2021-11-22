import {HttpHeaders} from "@angular/common/http";

export class AppSettings {
  public static CIPME_ADMINISTRATION_API_URL    = 'http://217.182.185.176:3000/administration';
  public static CIPME_SCORING_API_URL    = 'http://217.182.185.176:4000/scoring';

  public static UM_URL = "http://217.182.185.176:3000/administration/api/auth";
  public static UM_TOKEN_URL = "http://217.182.185.176:3000/administration/oauth/token";


  public static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
}
