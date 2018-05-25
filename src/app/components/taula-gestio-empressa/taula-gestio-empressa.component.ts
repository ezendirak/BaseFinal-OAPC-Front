import { InfoKey } from './../../interfaces/info-key';
import { InfoEmpressa } from './../../interfaces/info-empressa';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DraggableItemService, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ModalEditGestEmpComponent } from '../modal-edit-gest-emp/modal-edit-gest-emp.component';
import { AuthorizationService } from '../../services/authorization.service';
import { EmpressaService } from '../../services/empressa.service';
import { TrazaService } from '../../services/traza.service';
import { InfoKeyClass } from '../../model/info-key-class';
import { Estats } from '../../model/estats';
import { LiteralsRegistre } from '../../literals-registre.enum';

@Component({
  selector: 'app-taula-gestio-empressa',
  templateUrl: './taula-gestio-empressa.component.html',
  styleUrls: ['./taula-gestio-empressa.component.css']
})
export class TaulaGestioEmpressaComponent implements OnInit {

  @Input() items            :InfoEmpressa[];
  @Input() productesModal        :InfoKeyClass[];
  @Input()  estats          :Estats[];
  @Input()  estatsModal      :Estats[];
  @Output() evento_editEmpressa:    EventEmitter<any> = new EventEmitter();
  
  bsModalRef: BsModalRef;
  private literals = LiteralsRegistre;
  constructor(private translate            : TranslateService,
              private modalService : BsModalService,
              private AuthorizationService  :AuthorizationService,
              private EmpressaService       :EmpressaService,
              private TrazaService          :TrazaService) {
                translate.setDefaultLang('cat');
               }

  ngOnInit() {
  }
  // ModalEditGestEmpComponent

  openModalToEdit(item: InfoEmpressa) {
    
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Modificació d\'Empressa',
      lista: [],
      botonCerrar: "Tancar"  
    };

    console.log("Estem a taula gestio! => ");
    // console.log(this.productesModal);
    this.bsModalRef = this.modalService.show(ModalEditGestEmpComponent, {initialState});
    console.log(this.bsModalRef.content.productesNom);
    // Pass in data directly content atribute after show
    // console.log(JSON.stringify(item));
  //   this.bsModalRef.content.provaStrings = [
  //     "Poma","Nectarina"
  // ]
    this.bsModalRef.content.provaStrings = item.tipusProductes;
    this.bsModalRef.content.estats = [{nom:'Actiu', valor:'1'},{nom: 'Inactiu', valor: '0'}]
    console.log(this.bsModalRef.content.estats);
    // console.log(item);
    this.bsModalRef.content.datos_entrada = item; 
    this.bsModalRef.content.datos_salida = item;
    if(this.bsModalRef.content.datos_entrada.estat == 1)
    { 
      this.bsModalRef.content.estats.splice(0,1); //eliminar ese estado y sustituirlo por el que tiene el registro
      console.log(this.bsModalRef.content.estats);                  
      this.bsModalRef.content.estat ={
                          nom   : 'Actiu',
                          valor : '1'
                        }
                        console.log("Es Actiu");
                        this.bsModalRef.content.estats.push(this.bsModalRef.content.estat);
                        console.log(this.bsModalRef.content.estats);  
    }

    if(this.bsModalRef.content.datos_entrada.estat == 0)
    { 
      this.bsModalRef.content.estats.splice(1,1);
      console.log(this.bsModalRef.content.estats);  
                        this.bsModalRef.content.estat = {
                          nom  :'Inactiu', 
                          valor : '0'
                        }
                        console.log("Es Inactiu");
                        this.bsModalRef.content.estats.push(this.bsModalRef.content.estat);
                        console.log(this.bsModalRef.content.estats);  
    }  

    
    this.bsModalRef.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYES();                                
                              else  
                                this.actionPutNO();                                
      })
  }

  actionPutYES(){
    // console.log("ACTION PUT YES")
   console.log(this.bsModalRef.content.datos_salida);
    this.evento_editEmpressa.emit(this.bsModalRef.content.datos_salida);
    // this.actionToEdit(this.productEdit);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    // console.log("ACTION NO PUT")
    // console.log(this.bsModalRef.content.datos_salida);
  }
}
