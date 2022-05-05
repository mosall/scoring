// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from "@angular/common/http";

const BACK_IP: string = 'http://localhost';

export const environment = {
  production: false,

  CIPME_ADMINISTRATION_API_URL: BACK_IP+':3000/administration',
  CIPME_SCORING_API_URL: BACK_IP+':4000/scoring',

  UM_URL: BACK_IP+":3000/administration/api/auth",
  UM_TOKEN_URL: BACK_IP+":3000/administration/oauth/token",


  UM_HOME: BACK_IP+"/administration-awi/login",

  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
