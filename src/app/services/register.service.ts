import { Injectable } from '@angular/core';
import { ApiUrlConfigService }        from './api-url-config.service';
import { AuthorizationService }       from './authorization.service'; 

import { HttpClient, HttpHeaders, HttpParams }    from '@angular/common/http';
import { RegisterResponse } from '../interfaces/register-response';

import { Observable}                  from 'rxjs/Rx';
import { AtributsComboResponse } from '../interfaces/atributs-combo-response';
import { AtributsComboMap } from '../interfaces/atributs-combo-map';

@Injectable()
export class RegisterService {

  constructor(private http                 : HttpClient,
              private ApiUrlConfigService  : ApiUrlConfigService,
              private AuthorizationService : AuthorizationService) { }


getRegistres(): Observable<RegisterResponse[]>
{
  return this.http.get( this.ApiUrlConfigService._getRegistresURL, 
                        this.AuthorizationService.header_token()
                      )
                  .map(respuesta => respuesta)
                  .catch((error: any) => Observable.throw(error));  
}    

  getRegistresPage(page: number, per_page: number, filtro: any): Observable<RegisterResponse[]>
  {
    return this.http.get( this.ApiUrlConfigService._getRegistresPageFiltratURL + "?page=" + page + "&per_page=" + per_page, 
                          { params: filtro }
                        )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));
  }
  

  getRegistresCountFiltrat(filtre: any): Observable<number>
  {
    return this.http.get( this.ApiUrlConfigService._getRegistresCountURLFiltrat, 
                          {params: filtre}
                        )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));  
  }

  getRegistresCount(): Observable<number>
  {
    return this.http.get( this.ApiUrlConfigService._getRegistresCountURL, 
                          this.AuthorizationService.header_token()
                        )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));  
  }
  
  deleteRegistre(id: number): Observable<RegisterResponse>{

    return this.http.delete( this.ApiUrlConfigService._deleteRegistreURL + id,
                             this.AuthorizationService.header_token() 
                          )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));
  }

  getRegistre(id:number): Observable<RegisterResponse>
  {
    return this.http.get( this.ApiUrlConfigService._getRegistreURL + id, 
                          this.AuthorizationService.header_token()
                        )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));  
  }

  postRegistre(filtre: any): Observable<RegisterResponse> {
    console.log("Servei final: " + filtre);
    
    return this.http.post(  this.ApiUrlConfigService._postRegistreURL,
                            filtre , this.AuthorizationService.header_token()
                          )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));
  } 

  //////////////////////////////////////////////////////////////////////////////////////

  putRegistre(registre: RegisterResponse): Observable<RegisterResponse>{

      return this.http.put(  this.ApiUrlConfigService._putRegistreURL,
                             registre, this.AuthorizationService.header_token()
                          )
                      .map(respuesta => respuesta)
                      .catch((error: any) => Observable.throw(error));
  }

  getProductes(): Observable<string[]>
{
  return this.http.get( this.ApiUrlConfigService._getProductesURL, 
                        this.AuthorizationService.header_token()
                      )
                  .map(respuesta => respuesta)
                  .catch((error: any) => Observable.throw(error));  
}

getProductesModal(): Observable<string[]>
{
  return this.http.get( this.ApiUrlConfigService._getProductesModalURL, 
                        this.AuthorizationService.header_token()
                      )
                  .map(respuesta => respuesta)
                  .catch((error: any) => Observable.throw(error));  
}

getCombos(tipusProducte: String): Observable<AtributsComboResponse>
{
  return this.http.get( this.ApiUrlConfigService._getCombosProd + tipusProducte, 
                        this.AuthorizationService.header_token()
                      )
                  .catch((error: any) => Observable.throw(error));  
}

getAllCombos(){
  return this.http.get(this.ApiUrlConfigService._getAllCombos,
                        this.AuthorizationService.header_token()
                      )
                      .catch((error: any) => Observable.throw(error));
}


// https://stackoverflow.com/questions/47551458/how-to-pass-urlsearchparams-in-the-httpclient-get-method-angular-5
getResultatFiltrat(filtre: any): Observable<RegisterResponse[]>
{
  console.log("Servei final: " + filtre);
  return this.http.get( this.ApiUrlConfigService._resultatFiltrat, {params: filtre},
  )
  .map(respuesta => respuesta)
                  .catch((error: any) => Observable.throw(error));  
}
}
