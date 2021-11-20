import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (req.url.endsWith('attachments') || req.url.endsWith('incident')){
      const _key = sessionStorage.getItem('connectedUser');
      if(_key != null){
        const {token, role} = JSON.parse(_key);
        req = req.clone({
          setHeaders: {
          //  'Content-Type' : ' multipart/form-data',
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          },
        });
        return next.handle(req);
    }
  }
    const key = sessionStorage.getItem('connectedUser');
    if(key != null){
      const {token,role} = JSON.parse(key);
      req = req.clone({
        setHeaders: {
          'Content-Type' : 'application/json',
          'Accept'       : 'application/json',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*'

        },
      });
    }

    return next.handle(req);
  }
}
