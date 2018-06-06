import { InfoGestioReg } from './../model/info-gestio-reg';
import { RegisterResponse } from './../interfaces/register-response';
import { InfoKey } from './../interfaces/info-key';
import { Injectable } from '@angular/core';
import { ApiUrlConfigService }        from './api-url-config.service';
import { AuthorizationService }       from './authorization.service'; 

import { HttpClient, HttpHeaders, HttpParams }    from '@angular/common/http';

import { Observable}                  from 'rxjs/Rx';
import { AtributsComboResponse } from '../interfaces/atributs-combo-response';
import { AtributsComboMap } from '../interfaces/atributs-combo-map';
import { Register } from '../model/register';
import { Periode } from '../model/periode';

@Injectable()
export class GestioRegisterService {

  constructor(private http                 : HttpClient,
              private ApiUrlConfigService  : ApiUrlConfigService,
              private AuthorizationService : AuthorizationService) { }


getPeriodes(): Observable<Periode[]>
{
  return this.http.get(this.ApiUrlConfigService._periodesTotals,
                        this.AuthorizationService.header_token()
                        )
                        .catch((error: any) => Observable.throw(error));
  }

  getPeriodesByProd(subGrup:  String): Observable<Periode[]>
  { 
    return this.http.get( this.ApiUrlConfigService._periodesByProd + subGrup,
                          this.AuthorizationService.header_token()
                        )
                        .catch((error: any) => Observable.throw(error));
  }

  getProductesModal(): Observable<InfoKey[]>
  {//no s'ha canviat la url ja que es necessita exactament el mateix objecte. Evitem duplicacions.
    return this.http.get( this.ApiUrlConfigService._getProductesModalURL, 
                          this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));  
  }


  closePeriodeByProduct(productes:  String[]): Observable<String[]>
  {
    return this.http.put(   this.ApiUrlConfigService._putGestioPeriodeURL,
                            productes, this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));
  }

  putPep(objPep: InfoGestioReg){

    return this.http.put(  this.ApiUrlConfigService._putGestioPepURL,
                           objPep, this.AuthorizationService.header_token()
                          )
                          .catch((error: any) => Observable.throw(error));
}

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////PAGINATION/////////////////////////////////////////////////            

  getRegistresPage(page: number, per_page: number, filtro: any): Observable<InfoGestioReg[]>
  {
    return this.http.get( this.ApiUrlConfigService._getRegistresPageFiltratURL + "?page=" + page + "&per_page=" + per_page, 
                          {headers: this.AuthorizationService.header_tokenPol(),params: filtro}
                          )
                          .catch((error: any) => Observable.throw(error));
  }
  

  getRegistresCountFiltrat(filtre: any): Observable<number>
  {
    return this.http.get( this.ApiUrlConfigService._getRegistresCountURLFiltrat, 
                          {headers: this.AuthorizationService.header_tokenPol(),params: filtre}
                          )
                          .catch((error: any) => Observable.throw(error));  
  }


  getRegistresProdEmpPerPage(page: number, per_page: number, filtro: any): Observable<InfoGestioReg[]>
  {
    return this.http.get( this.ApiUrlConfigService._getRegistresPEPPageFiltratURL + "?page=" + page + "&per_page=" + per_page, 
                          {headers: this.AuthorizationService.header_tokenPol(),params: filtro}
                          )
                          .catch((error: any) => Observable.throw(error));
  }
  

  getRegistresProdEmpPerCountFiltrat(filtre: any): Observable<number>
  {
    return this.http.get( this.ApiUrlConfigService._getRegistresPEPCountURL, 
                          {headers: this.AuthorizationService.header_tokenPol(),params: filtre}
                          )
                          .catch((error: any) => Observable.throw(error));  
  }
}
