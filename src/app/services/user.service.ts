
import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable }               from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiUrlConfigService }      from './api-url-config.service';
import { AuthorizationService }     from './authorization.service';

import { UsersResponse }            from '../interfaces/users-response';

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class UserService {

  constructor(private http                 : HttpClient,
              private ApiUrlConfigService  : ApiUrlConfigService,
              private AuthorizationService : AuthorizationService) 
  { }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  userall(): Observable<UsersResponse[]> {
    return this.http.get(this.ApiUrlConfigService._userallURL,
      this.AuthorizationService.header_token())
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));
  }

  //////////////////////////////////////////////////////////////////////////////////////

}