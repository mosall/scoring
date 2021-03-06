import {HttpHeaders} from "@angular/common/http";

export class AppSettings {

  private static BACK_IP = 'http://localhost';


  public static CIPME_ADMINISTRATION_API_URL    = AppSettings.BACK_IP+':3000/administration';
  public static CIPME_SCORING_API_URL    = AppSettings.BACK_IP+':4000/scoring';

  public static UM_URL = AppSettings.BACK_IP+":3000/administration/api/auth";
  public static UM_TOKEN_URL = AppSettings.BACK_IP+":3000/administration/oauth/token";


  public static UM_HOME = AppSettings.BACK_IP+"/administration-awi/login";

  public static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
}
