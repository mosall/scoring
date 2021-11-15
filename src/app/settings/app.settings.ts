import {HttpHeaders} from "@angular/common/http";

export class AppSettings {
  public static CIPME_SCORING_API_URL    = 'http://localhost:4000/scoring';

  public static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
}
