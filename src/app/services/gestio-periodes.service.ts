import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiUrlConfigService } from './api-url-config.service';
import { Periode } from '../model/periode';

import { HttpClient, HttpHeaders, HttpParams }    from '@angular/common/http';

@Injectable()
export class GestioPeriodesService {

  constructor(private ApiUrlConfigService:  ApiUrlConfigService,
              private http                 : HttpClient) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// PAGINATION ///////////////////////////////////////////////////////

getRegistresPage(page: number, per_page: number, filtro: any): Observable<Periode[]>
{
  return this.http.get( this.ApiUrlConfigService._periodesFiltrat + "?page=" + page + "&per_page=" + per_page, 
                        { params: filtro }
                      )
                  .map(respuesta => respuesta)
                  .catch((error: any) => Observable.throw(error));
}


getRegistresCountFiltrat(filtre: any): Observable<number>
{
  return this.http.get( this.ApiUrlConfigService._periodes_countFiltrat, 
                        {params: filtre}
                      )
                  .map(respuesta => respuesta)
                  .catch((error: any) => Observable.throw(error));  
}
}
