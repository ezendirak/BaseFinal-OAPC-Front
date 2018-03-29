import { MessageService } from './../../services/message.service';
import { Component, OnInit }         from '@angular/core';
import { TemplateRef }               from '@angular/core';

import { Observable, Subscription }  from 'rxjs/Rx';

import { BsModalService }            from 'ngx-bootstrap/modal';
import { BsModalRef }                from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AuthorizationService }      from '../../services/authorization.service';
import { TrazaService }              from '../../services/traza.service';
import { NotesService }              from '../../services/notes.service';

import { NotesResponse }             from '../../interfaces/notes-response';

import { ModalNoteComponent }        from '../modal-note/modal-note.component';

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public islogged: boolean;

  // interfaz de respuesta
  misnotes: NotesResponse[];
  minote  : NotesResponse;

  // doble data binding formulario
  private ftitulo;
  private fcontenido;

  // modal
  bsModalRef: BsModalRef;

  constructor( private AuthorizationService: AuthorizationService, 
               private NotesService        : NotesService, 
               private TrazaService        : TrazaService,
               private modalService        : BsModalService,
               private MessageService      : MessageService
              ) 
  { }

  ngOnInit() {
      this.islogged = this.AuthorizationService.is_logged();
      this.getNotes();
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  getNotes()
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNotes()
      .subscribe ( respuesta => { this.misnotes = respuesta;
                                  this.TrazaService.dato("NOTES", "API GETNOTES OK", this.misnotes);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTES KO", error); } 
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

  getNote(id: number)
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNote(id)
      .subscribe ( respuesta => { this.minote = respuesta;
                                  this.TrazaService.dato("NOTES", "API GETNOTE OK", this.misnotes);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTE KO", error); }   
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

  postNote(title: string, content: string, refresh?: boolean)
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.postNote(title, content)
      .subscribe ( respuesta => { this.minote = respuesta;
                                  this.TrazaService.dato("NOTES", "API POSTNOTE OK", this.minote);

                                  if (refresh)
                                    this.getNotes();
                                },
                  error =>      { this.TrazaService.error("NOTES", "API POSTNOTE KO", error); }    
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

  putNote(id: number, title: string, content: string, refresh?: string)
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.putNote(id, title, content)
      .subscribe ( respuesta => { this.minote = respuesta;
                                  this.TrazaService.dato("NOTES", "API PUTNOTE OK", this.minote);
                                  
                                  if (refresh)
                                    this.getNotes();
                                },
                  error =>      { this.TrazaService.error("NOTES", "API PUTNOTE KO", error); }      
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

  deleteNote(id: number, refresh?:boolean)
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.deleteNote(id)
      .subscribe ( respuesta => { this.minote = respuesta;
                                  this.TrazaService.dato("NOTES", "API DELETE OK", this.minote);

                                  if (refresh)
                                    this.getNotes();
                                },
                  error =>      { this.TrazaService.error("NOTES", "API DELETE KO", error); }     
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

  actionGetNotes()
  {
    //this.getNotes();
    //this.getNote(100);

    this.getNotes();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  actionPostNote(formulario)
  {
    //this.postNote("hola", "que tal");

    //console.log(formulario);
    //console.log(formulario.controls['titulo'].value);
    //console.log(formulario.controls['contenido'].value);

    this.postNote(this.ftitulo,this.fcontenido, true)

    this.ftitulo    = "";
    this.fcontenido = ""; 
  }

  //////////////////////////////////////////////////////////////////////////////////////
  
  actionPutNote(note)
  {
    //this.putNote(1,"modificada primera nota","otro campo");

    const initialState = {
      list: [ JSON.stringify(note) ],
      title: 'Modificar Note'
    };
    this.bsModalRef = this.modalService.show(ModalNoteComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Cerrar';
  }

  //////////////////////////////////////////////////////////////////////////////////////

  actionDeleteNote(note)
  {
    //this.deleteNote(1);
    console.log("Test de note: " + note.id);
    this.deleteNote(note.id, true)
  }
}
  /////////////////////////////////////////////////////////////////////////////////////////
