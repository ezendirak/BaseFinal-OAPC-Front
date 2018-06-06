import { Empressa } from './../model/empressa';
import { InfoEmpressa } from './../interfaces/info-empressa';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConfigService } from './api-url-config.service';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs/Observable';
import { InfoKey } from '../interfaces/info-key';
import { InfoKeyClass } from '../model/info-key-class';

@Injectable()
export class EmpressaService {

  constructor(private http                 : HttpClient,
              private ApiUrlConfigService  : ApiUrlConfigService,
              private AuthorizationService : AuthorizationService) { }



  getEmpressa():  Observable<String[]>
  {
    return this.http.get( this.ApiUrlConfigService._allEmpresses, 
                          this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));
  }

  getEmpressaNoTotes():  Observable<String[]>
  {
    return this.http.get( this.ApiUrlConfigService._allEmpressesNoTotes, 
                          this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));
  }

  getEmpressaActivaNoTotes():  Observable<String[]>
  {
    return this.http.get( this.ApiUrlConfigService._allEmpressesActivaNoTotes, 
                          this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));
  }

  getProductes(): Observable<InfoKey[]>
  {
    return this.http.get( this.ApiUrlConfigService._provaTest, 
                          this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));  
  }

  getProductesModal(): Observable<InfoKeyClass[]>
  {
    return this.http.get( this.ApiUrlConfigService._getProductesModal, 
                          this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));
  }

  getProductesModalName(): Observable<string[]>
  {
    return this.http.get( this.ApiUrlConfigService._getProductesModalNom, 
                          this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));
  }

  putEmpressa(registre: InfoEmpressa){

    return this.http.put(  this.ApiUrlConfigService._putGestioEmpressaURL,
                           registre, this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));
}

deleteEmpressa(registre: InfoEmpressa){
    return this.http.put(  this.ApiUrlConfigService._deleteGestioEmpressaURL,
                          registre, this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));
}

getEmpresesByProd(producte: string): Observable<String[]>
{
  return this.http.get( this.ApiUrlConfigService._getEmpresesByProd + producte, 
                        this.AuthorizationService.header_token()
                        )
                        .catch((error: any) => Observable.throw(error));
}

getEmpByUserId(userId: number): Observable<String>
{
  return this.http.get( this.ApiUrlConfigService._getEmpresesByUserId + userId, 
                        this.AuthorizationService.header_tokenNoContent()
                        )
                        .catch((error: any) => Observable.throw(error));
}

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// PAGINATION ///////////////////////////////////////////////////////

  getRegistresPage(page: number, per_page: number, filtro: any): Observable<InfoEmpressa[]>
  {
    return this.http.get( this.ApiUrlConfigService._empressesFiltrat + "?page=" + page + "&per_page=" + per_page, 
                          {headers: this.AuthorizationService.header_tokenPol(), params: filtro }
                          )
                          .catch((error: any) => Observable.throw(error));
  }
  

  getRegistresCountFiltrat(filtre: any): Observable<number>
  {
    return this.http.get( this.ApiUrlConfigService._empresses_countFiltrat, 
                          {headers: this.AuthorizationService.header_tokenPol(), params: filtre}
                          )
                          .catch((error: any) => Observable.throw(error));  
  }
}
