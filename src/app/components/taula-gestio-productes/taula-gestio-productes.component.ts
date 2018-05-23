import { InfoGestioProd } from './../../interfaces/info-gestio-prod';
import { AtributsComboMap } from './../../interfaces/atributs-combo-map';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalEditGestProdComponent } from '../modal-edit-gest-prod/modal-edit-gest-prod.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-taula-gestio-productes',
  templateUrl: './taula-gestio-productes.component.html',
  styleUrls: ['./taula-gestio-productes.component.css']
})
export class TaulaGestioProductesComponent implements OnInit {

  @Input() regisProd    :InfoGestioProd[];

  @Output() evento_putRegistre:   EventEmitter<any> = new EventEmitter();
  
  bsModalRef: BsModalRef;
  private literals = LiteralsRegistre;
  
  constructor(private modalService : BsModalService,
              private translate            : TranslateService) { 
                translate.setDefaultLang('cat');
              }

  ngOnInit() {

  }

  openModalToEdit(item: InfoGestioProd) {
    
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Modificació del Producte',
      lista: [],
      botonCerrar: "Tancar"  
    };

    this.bsModalRef = this.modalService.show(ModalEditGestProdComponent, {initialState});
    
    // Pass in data directly content atribute after show
    console.log(item);
    this.bsModalRef.content.datos_entrada = item;
    this.bsModalRef.content.datos_salida = item;
    
    

    
    this.bsModalRef.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYES();                                
                              else  
                                this.actionPutNO();                                
      })
  }

  actionPutYES(){
    console.log("ACTION PUT YES")
    
    // console.log(this.bsModalRef.content.datos_salida);

    this.actionToEdit(this.bsModalRef.content.datos_salida);
    // this.actionToEdit(this.productEdit);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    console.log("ACTION NO PUT")
    console.log(this.bsModalRef.content.datos_salida);
  }

  actionToEdit(datos_salida:  InfoGestioProd){
    this.evento_putRegistre.emit(datos_salida);
  }

}
