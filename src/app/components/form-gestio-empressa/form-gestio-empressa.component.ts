import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { InfoEmpressa } from '../../interfaces/info-empressa';
import { InfoKey } from '../../interfaces/info-key';
import { HttpParams } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalToAddEmpComponent } from '../modal-to-add-emp/modal-to-add-emp.component';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { InfoKeyClass } from '../../model/info-key-class';

@Component({
  selector: 'app-form-gestio-empressa',
  templateUrl: './form-gestio-empressa.component.html',
  styleUrls: ['./form-gestio-empressa.component.css']
})
export class FormGestioEmpressaComponent implements OnInit {

  @Input() items      :InfoEmpressa;
  @Input() empresses  :String[];
  @Input() productes  :InfoKey[];
  @Input() productesModal        :InfoKeyClass[];
  
  @Output() evento_filtroGestioEmpressa:  EventEmitter<any> = new EventEmitter();
  @Output() evento_AddNewEmpressa:  EventEmitter<any> = new EventEmitter();

  selectedEmpressa  :string;
  selectedProducte  :InfoKey;
  estat             :string;
  
  bsModalRef: BsModalRef;
  private literals = LiteralsRegistre;
  
  constructor(private modalService : BsModalService) { }

  ngOnInit() {
  }

  onclick(){
    let params = new HttpParams();
    if(this.selectedEmpressa && this.selectedEmpressa != 'Totes'){
      params = params.set('codiEmpressa', this.selectedEmpressa);
    }
    if(this.selectedProducte && this.selectedProducte.nom != 'Tots'){
      params = params.set('tipusProducte', this.selectedProducte.nom);
    }
    if(this.estat){
      params = params.set('estat', this.estat);
    }

    console.log(params);
    this.evento_filtroGestioEmpressa.emit(params);
  }
  
  openModalToAddEmp($event) {
    
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Modificació del Producte',
      lista: [],
      botonCerrar: "Tancar"  
    };

    this.bsModalRef = this.modalService.show(ModalToAddEmpComponent, {initialState});
    
    // Pass in data directly content atribute after show
    
    // this.bsModalRef.content.datos_entrada = item;
    this.bsModalRef.content.datos_salida = {'codi': null, 'tipusProductes': null, 'estat': null};
    
    
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

    this.evento_AddNewEmpressa.emit(this.bsModalRef.content.datos_salida);
    // this.actionToEdit(this.productEdit);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    console.log("ACTION NO PUT")
    console.log(this.bsModalRef.content.datos_salida);
  }
}
