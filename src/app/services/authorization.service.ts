
import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Router }                   from '@angular/router';
import { Observable }               from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//////////////////////////////////////////////////////////////////////////////////////

import { ApiUrlConfigService }      from './api-url-config.service';
import { TrazaService }             from './traza.service';

import { TokenResponse }            from '../interfaces/token-response';
import { MyUser }                   from './../interfaces/my-user';

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class AuthorizationService {

  private myuser: MyUser

  constructor(private http                : HttpClient,
              private router              : Router,
              private ApiUrlConfigService : ApiUrlConfigService,
              private TrazaService        : TrazaService) 
  { }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  login(user: string, pass: string): Observable<TokenResponse> {
    return this.http.post(this.ApiUrlConfigService._loginURL,
      { "username": user, "password": pass },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));
  }

  //////////////////////////////////////////////////////////////////////////////////////

  whoami(): Observable<any> {
    console.log(this.header_token());
    return this.http.get(this.ApiUrlConfigService._whoamiURL,
      this.header_token())
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));
  }

  //////////////////////////////////////////////////////////////////////////////////////

  refresh(): Observable<TokenResponse> {
    return this.http.post(this.ApiUrlConfigService._refreshURL,
      {},
      this.header_token())
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));
  }

  //////////////////////////////////////////////////////////////////////////////////////

  change_password(oldpass: string, newpass: string): Observable<any> {
    return this.http.post(this.ApiUrlConfigService._change_passwordURL,
      { "oldPassword": oldpass, "newPassword": newpass },
      this.header_token())
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));
  }
  
  //////////////////////////////////////////////////////////////////////////////////////

  logout() {
    localStorage.removeItem('USER');
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  is_logged() {
    if (localStorage.getItem('USER')) {
      // console.log(JSON.parse(localStorage.getItem('USER')));
      return true;
    }
    else {
      // console.log("NO ESTAS LOGEADO");
      return false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////

  header_token() {
    if (this.is_logged()) {
      
      this.myuser = JSON.parse(localStorage.getItem("USER"));

      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.myuser.token
        })
      };
    }
    else
      return null;
  }
  
  header_tokenPol() {
    if (this.is_logged()) {
      this.myuser = JSON.parse(localStorage.getItem("USER"));
      let headers = new HttpHeaders();
      headers  = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', 'Bearer ' + this.myuser.token);
      return headers;
    }
    else
      return null;
  }
  //////////////////////////////////////////////////////////////////////////////////////

  user_name(): string {
    if (this.is_logged()) {
      this.myuser = JSON.parse(localStorage.getItem("USER"));
      return (this.myuser.firstname + " " + this.myuser.lastname);
    }
  }

  // isUser(): boolean {
  //   if ()
  // }
}
