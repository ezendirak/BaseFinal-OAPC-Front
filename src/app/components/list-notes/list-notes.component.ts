import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef }                     from 'ngx-bootstrap';

import { ModalNoteComponent }                             from '../modal-note/modal-note.component';

import { Ipagination }                                    from './../../interfaces/ipagination';

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

export class ListNotesComponent implements OnInit {

  @Input()  items;
  @Output() evento_list_put:    EventEmitter<any> = new EventEmitter();
  @Output() evento_list_delete: EventEmitter<any> = new EventEmitter();

  bsModalRef: BsModalRef;

  constructor(private modalService : BsModalService) 
  { }

  ngOnInit() 
  { }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  openModal(item) {
    
    // Pass in data directly before show method
    const initialState = {
      titulo: 'TITULO DEL MODAL',
      lista: [],
      botonCerrar: "Cerrar"  
    };

    this.bsModalRef = this.modalService.show(ModalNoteComponent, {initialState});

    // Pass in data directly content atribute after show
    this.bsModalRef.content.datos_entrada = JSON.stringify(item);

    // Get out
    this.bsModalRef.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYES();                                
                              else  
                                this.actionPutNO();                                
      })
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutYES(){
    console.log("ACTION PUT YES")
    console.log(this.bsModalRef.content.datos_salida);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    console.log("ACTION NO PUT")
    console.log(this.bsModalRef.content.datos_salida);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionDelete(item) {
    console.log("////////////////////////////////////////////////");
    console.log(item);
    this.evento_list_delete.emit(item);
  }
}
