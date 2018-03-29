
  import { Injectable }                 from '@angular/core';
  import { HttpClient, HttpHeaders }    from '@angular/common/http';
  import { Observable}                  from 'rxjs/Rx';

  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/catch';

  import { ApiUrlConfigService }        from './api-url-config.service';
  import { AuthorizationService }       from './authorization.service';  
  
  import { NotesResponse }              from '../interfaces/notes-response';
  
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  @Injectable()
  export class NotesService {

    constructor(private http                 : HttpClient,
                private ApiUrlConfigService  : ApiUrlConfigService,
                private AuthorizationService : AuthorizationService)             
    { }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

    getNotes(): Observable<NotesResponse[]> {
      return this.http.get(this.ApiUrlConfigService._getNotesURL,
        this.AuthorizationService.header_token()
      )
        .map(respuesta => respuesta)
        .catch((error: any) => Observable.throw(error));
    }

    //////////////////////////////////////////////////////////////////////////////////////

    getNotesPage(page: number, per_page: number): Observable<NotesResponse[]> {
      return this.http.get(this.ApiUrlConfigService._getNotesPageURL + "?page=" + page + "&per_page=" + per_page,
        this.AuthorizationService.header_token()
      )
        .map(respuesta => respuesta)
        .catch((error: any) => Observable.throw(error));
    }

    getNotesCount(): Observable<number> {
      return this.http.get(this.ApiUrlConfigService._getNotesCountURL,
        this.AuthorizationService.header_token()
      )
        .map(respuesta => respuesta)
        .catch((error: any) => Observable.throw(error));
    }


    //////////////////////////////////////////////////////////////////////////////////////

    getNote(id: number): Observable<NotesResponse> {
      return this.http.get(this.ApiUrlConfigService._getNoteURL + id,
        this.AuthorizationService.header_token()
      )
        .map(respuesta => respuesta)
        .catch((error: any) => Observable.throw(error));
    }

    //////////////////////////////////////////////////////////////////////////////////////

    postNote(title: string, content: string): Observable<NotesResponse> {
      return this.http.post(this.ApiUrlConfigService._postNoteURL,
        { "title": title, "content": content },
        this.AuthorizationService.header_token()
      )
        .map(respuesta => respuesta)
        .catch((error: any) => Observable.throw(error));
    }

    //////////////////////////////////////////////////////////////////////////////////////

    putNote(id: number, title: string, content: string): Observable<NotesResponse> {
      return this.http.put(this.ApiUrlConfigService._putNoteURL + id,
        { "title": title, "content": content },
        this.AuthorizationService.header_token()
      )
        .map(respuesta => respuesta)
        .catch((error: any) => Observable.throw(error));
    }

    //////////////////////////////////////////////////////////////////////////////////////

    deleteNote(id: number): Observable<NotesResponse> {
      return this.http.delete(this.ApiUrlConfigService._deleteNoteURL + id,
        this.AuthorizationService.header_token()
      )
        .map(respuesta => respuesta)
        .catch((error: any) => Observable.throw(error));
    }

  //////////////////////////////////////////////////////////////////////////////////////

}
