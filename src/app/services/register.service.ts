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
    // let headers = new HttpHeaders();
    console.log(this.AuthorizationService.header_token());
    // headers  = headers.append('Authorization', 'Bearer '+ this.AuthorizationService.header_token());
    // headers  = headers.append('Content-Type', 'application/json');
    // console.log("Header: ");
    // console.log(headers);
    return this.http.get( this.ApiUrlConfigService._getRegistresPageFiltratURL + "?page=" + page + "&per_page=" + per_page, 
                          { headers: this.AuthorizationService.header_tokenPol(), params: filtro }
                        )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));
  }
  

  getRegistresCountFiltrat(filtre: any): Observable<number>
  {
    
    console.log(this.AuthorizationService.header_token());
    // console.log("Header: ");
    // console.log(headers);
    return this.http.get( this.ApiUrlConfigService._getRegistresCountURLFiltrat, 
                          {headers: this.AuthorizationService.header_tokenPol(),params: filtre}
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
    // console.log("Servei final: " + filtre);
    
    return this.http.post(  this.ApiUrlConfigService._postRegistreURL,
                            filtre , this.AuthorizationService.header_token()
                          )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));
  } 

  postRegistreFromExcel(filtre: any, familia: number): Observable<RegisterResponse> {
    console.log("Servei final EXCEL: " + filtre);
    
    return this.http.post(  this.ApiUrlConfigService._postRegistreFromExcelURL + familia,
                            filtre , this.AuthorizationService.header_token()
                          )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));
  } 

  //////////////////////////////////////////////////////////////////////////////////////

  // putRegistre(registre: RegisterResponse): Observable<RegisterResponse>{

  //     return this.http.put(  this.ApiUrlConfigService._putRegistreURL, 
  //                         {headers: this.AuthorizationService.header_tokenPol(), params: registre}
  //                         )
  //                     .map(respuesta => respuesta)
  //                     .catch((error: any) => Observable.throw(error));
  // }
  putRegistre(registre: any)
  {
    return this.http.put(  this.ApiUrlConfigService._putRegistreURL, 
                        registre, this.AuthorizationService.header_token()
                        )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));
}

  putPerNoCom(nouRegistreNoCom: any)
  {
    return this.http.put(  this.ApiUrlConfigService._putRegNoComPer,
                           nouRegistreNoCom, this.AuthorizationService.header_token()
                        )
                        .map(respuesta => respuesta)
                        .catch((error: any) => Observable.throw(error));
  }

  
  getProductes(): Observable<InfoKey[]>
{
  return this.http.get( this.ApiUrlConfigService._provaTest, 
                        this.AuthorizationService.header_token()
                      )
                  .map(respuesta => respuesta)
                  .catch((error: any) => Observable.throw(error));  
}

getProductesModal(): Observable<InfoKey[]>
{
  return this.http.get( this.ApiUrlConfigService._getProductesModalURL, 
                        this.AuthorizationService.header_token()
                      )
                  .map(respuesta => respuesta)
                  .catch((error: any) => Observable.throw(error));  
}
getProductesModalByType(subGrup: String): Observable<InfoKey[]>
{
  return this.http.get( this.ApiUrlConfigService._getProductesModalByTypeURL + subGrup,
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

getCombosModalToAdd(tipusProducte: String): Observable<AtributsComboResponse>
{
  return this.http.get( this.ApiUrlConfigService._getCombosProdModalToAdd + tipusProducte, 
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

getAllNamesCombos(){
  return this.http.get(this.ApiUrlConfigService._getAllNamesCombos,
                        this.AuthorizationService.header_token()
                      )
                      .catch((error: any) => Observable.throw(error));
}


// https://stackoverflow.com/questions/47551458/how-to-pass-urlsearchparams-in-the-httpclient-get-method-angular-5
getResultatFiltrat(filtre: any): Observable<RegisterResponse[]>
{
  // console.log("Servei final: " + filtre);
  return this.http.get( this.ApiUrlConfigService._resultatFiltrat, 
                        {headers: this.AuthorizationService.header_tokenPol(), params: filtre},
                        )
                        .map(respuesta => respuesta)
                        .catch((error: any) => Observable.throw(error));  
}

getPeriodes(): Observable<Periode[]>
{
  return this.http.get(this.ApiUrlConfigService._periodesTotals,
                        this.AuthorizationService.header_token()
    )
    .catch((error: any) => Observable.throw(error));
  }

  getPeriodesDisponibles(): Observable<Periode[]>
  {
  return this.http.get(this.ApiUrlConfigService._periodesDisponibles,
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

  getPeriodesByProductes(productes: string): Observable<Periode[]>
  {
    return this.http.get( this.ApiUrlConfigService._periodesByProductes + productes,
                          this.AuthorizationService.header_token()
                        )
                        .catch((error: any) => Observable.throw(error));
  }

  getDownloadToExcel(items: RegisterResponse[])
  {
    // console.log("Estem al servei");
    // console.log(items);
    // console.log(JSON.stringify(items));
    // const frmData = new FormData();
    // frmData.append("frmData", JSON.stringify(items))
    return this.http.post( this.ApiUrlConfigService._downloadToExcel, JSON.stringify(items),
                          this.AuthorizationService.header_token()
    )
    .catch((error: any) => Observable.throw(error));
  }
}
