import { GestionsService } from './services/gestions.service';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from './services/register.service';

import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { HttpClientModule }       from '@angular/common/http';

import { FormsModule }            from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';

import { CollapseModule }         from 'ngx-bootstrap';
import { BsDropdownModule }       from 'ngx-bootstrap';
import { ModalModule  }           from 'ngx-bootstrap';

import { AppComponent }           from './app.component';
import { AppRoutingModule }       from './app-routing.module';

import { HomeComponent }          from './components/home/home.component';
import { HeaderComponent }          from './components/header/header.component';
import { FooterComponent }          from './components/footer/footer.component';
import { PageNotFoundComponent }    from './components/page-not-found/page-not-found.component';
import { LoginComponent}            from './components/login/login.component';
import { LogoutComponent }          from './components/logout/logout.component';
import { NotesComponent }           from './components/notes/notes.component';

import { ModalNoteComponent }       from './components/modal-note/modal-note.component';

import { ApiUrlConfigService }      from './services/api-url-config.service';
import { AuthorizationService }     from './services/authorization.service';
import { UserService }              from './services/user.service';
import { NotesService }             from './services/notes.service';
import { TrazaService }             from './services/traza.service';

import { Notes2Component }          from './components/notes2/notes2.component';
import { FormNotesComponent }       from './components/form-notes/form-notes.component';
import { ListNotesComponent }       from './components/list-notes/list-notes.component';
import { ButtonListNotesComponent } from './components/button-list-notes/button-list-notes.component';
import { MessageService }           from './services/message.service';
import { ButtonTaulaRegisterComponent } from './components/button-taula-register/button-taula-register.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { TaulaRegisterComponent } from './components/taula-register/taula-register.component';
import { RegisterComponent } from './components/register/register.component';
// TranslateLoader
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalToAddComponent } from './components/modal-to-add/modal-to-add.component';
import { LectorExcelComponent } from './components/lector-excel/lector-excel.component';
import { GestioProductesComponent } from './components/gestio-productes/gestio-productes.component';
import { FormGestioProductesComponent } from './components/form-gestio-productes/form-gestio-productes.component';
import { TaulaGestioProductesComponent } from './components/taula-gestio-productes/taula-gestio-productes.component';
import { ButtonTaulaGestioProdComponent } from './components/button-taula-gestio-prod/button-taula-gestio-prod.component';
import { ModalEditGestProdComponent } from './components/modal-edit-gest-prod/modal-edit-gest-prod.component';
//import { TranslateLoader } from '@ngx-translate/core';
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    NotesComponent,
    ModalNoteComponent,
    Notes2Component,
    FormNotesComponent,
    ListNotesComponent,
    ButtonListNotesComponent,
    ButtonTaulaRegisterComponent,
    FormRegisterComponent,
    TaulaRegisterComponent,
    RegisterComponent,
    ModalToAddComponent,
    LectorExcelComponent,
    GestioProductesComponent,
    FormGestioProductesComponent,
    TaulaGestioProductesComponent,
    ButtonTaulaGestioProdComponent,
    ModalEditGestProdComponent
  ],

  entryComponents: [ModalNoteComponent, ModalToAddComponent, ModalEditGestProdComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(), 
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],

  providers: [
    TrazaService,
    ApiUrlConfigService, 
    AuthorizationService, 
    UserService, 
    NotesService,
    MessageService,
    RegisterService,
    TranslateService,
    GestionsService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }