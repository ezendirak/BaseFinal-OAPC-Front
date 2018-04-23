import { InfoGestioProd } from './../interfaces/info-gestio-prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConfigService } from './api-url-config.service';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs/Observable';
import { InfoKey } from '../interfaces/info-key';

@Injectable()
export class GestionsService {

  constructor(private http                 : HttpClient,
              private ApiUrlConfigService  : ApiUrlConfigService,
              private AuthorizationService : AuthorizationService) { }


  getProductes(): Observable<InfoKey[]>
  {
    return this.http.get( this.ApiUrlConfigService._provaTest, 
           this.AuthorizationService.header_token()
     )
    .map(respuesta => respuesta)
   .catch((error: any) => Observable.throw(error));  
 }
 
 getFamilies(): Observable<InfoKey[]>
  {
    return this.http.get( this.ApiUrlConfigService._allFam, 
           this.AuthorizationService.header_token()
     )
    .map(respuesta => respuesta)
   .catch((error: any) => Observable.throw(error));  
 }
 
 getTaulaProd(): Observable<InfoGestioProd[]>
 {
   return this.http.get( this.ApiUrlConfigService._atributsProd, 
          this.AuthorizationService.header_token()
    )
   .map(respuesta => respuesta)
  .catch((error: any) => Observable.throw(error));  
}


getRegistresPage(page: number, per_page: number, filtro: any): Observable<InfoGestioProd[]>
{
    return this.http.get( this.ApiUrlConfigService._atributsProdFiltrat + "?page=" + page + "&per_page=" + per_page, 
    { params: filtro }
  )
    .map(respuesta => respuesta)
  .catch((error: any) => Observable.throw(error)); 
}

getRegistresCountFiltrat(filtre: any): Observable<number>
  {
    return this.http.get( this.ApiUrlConfigService._getAtributsProd_countFiltrat, 
                          {params: filtre}
                        )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));  
  }

  putRegistre(registre: InfoGestioProd): Observable<InfoGestioProd>{

    return this.http.put(  this.ApiUrlConfigService._putGestioProducteURL,
                           registre, this.AuthorizationService.header_token()
                        )
                    .map(respuesta => respuesta)
                    .catch((error: any) => Observable.throw(error));
}

}