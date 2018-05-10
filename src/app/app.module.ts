import { GestioPeriodesService } from './services/gestio-periodes.service';
import { GestionsService } from './services/gestions.service';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from './services/register.service';

import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { HttpClientModule }       from '@angular/common/http';

import { FormsModule }            from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';

import { CollapseModule, BsDatepickerModule }         from 'ngx-bootstrap';
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
import { GestioEmpressaComponent } from './components/gestio-empressa/gestio-empressa.component';
import { FormGestioEmpressaComponent } from './components/form-gestio-empressa/form-gestio-empressa.component';
import { TaulaGestioEmpressaComponent } from './components/taula-gestio-empressa/taula-gestio-empressa.component';
import { ButtonTaulaGestioEmpressaComponent } from './components/button-taula-gestio-empressa/button-taula-gestio-empressa.component';
import { EmpressaService } from './services/empressa.service';
import { ModalEditGestEmpComponent } from './components/modal-edit-gest-emp/modal-edit-gest-emp.component';

import { ModalToAddProdComponent } from './components/modal-to-add-prod/modal-to-add-prod.component';

import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { ModalToAddEmpComponent } from './components/modal-to-add-emp/modal-to-add-emp.component';
import { GestioRegisterComponent } from './components/gestio-register/gestio-register.component';
import { TaulaGestioRegisterComponent } from './components/taula-gestio-register/taula-gestio-register.component';
import { FormGestioRegisterComponent } from './components/form-gestio-register/form-gestio-register.component';
import { ButtonTaulaGestioRegisterComponent } from './components/button-taula-gestio-register/button-taula-gestio-register.component';
import { GestioRegisterService } from './services/gestio-register.service';
import { ModalToClosePerComponent } from './components/modal-to-close-per/modal-to-close-per.component';
import { GestioPeriodesComponent } from './components/gestio-periodes/gestio-periodes.component';
import { FormGestioPeriodesComponent } from './components/form-gestio-periodes/form-gestio-periodes.component';
import { TaulaGestioPeriodesComponent } from './components/taula-gestio-periodes/taula-gestio-periodes.component';
import { ButtonTaulaGestioPeriodesComponent } from './components/button-taula-gestio-periodes/button-taula-gestio-periodes.component';
import { ModalToAddCalendarComponent } from './components/modal-to-add-calendar/modal-to-add-calendar.component';


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
    ModalEditGestProdComponent,
    GestioEmpressaComponent,
    FormGestioEmpressaComponent,
    TaulaGestioEmpressaComponent,
    ButtonTaulaGestioEmpressaComponent,
    ModalEditGestEmpComponent,
    ModalToAddProdComponent,
    ModalToAddEmpComponent,
    GestioRegisterComponent,
    TaulaGestioRegisterComponent,
    FormGestioRegisterComponent,
    ButtonTaulaGestioRegisterComponent,
    ModalToClosePerComponent,
    GestioPeriodesComponent,
    FormGestioPeriodesComponent,
    TaulaGestioPeriodesComponent,
    ButtonTaulaGestioPeriodesComponent,
    ModalToAddCalendarComponent
  ],

  entryComponents: [ModalNoteComponent, ModalToAddComponent, ModalEditGestProdComponent, ModalEditGestEmpComponent, ModalToAddProdComponent, ModalToAddEmpComponent, ModalToClosePerComponent, ModalToAddCalendarComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
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
    ModalModule.forRoot(),
    NgxSelectModule,
    BsDatepickerModule
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
    GestionsService,
    EmpressaService,
    GestioRegisterService,
    GestioPeriodesService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }