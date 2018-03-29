import { AtributsComboMap } from './../../interfaces/atributs-combo-map';
import { AtributsComboResponse } from './../../interfaces/atributs-combo-response';
import { RegisterResponse } from './../../interfaces/register-response';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LiteralsRegistre } from './../../literals-registre.enum';
import { ModalNoteComponent } from '../modal-note/modal-note.component';
import { BsModalService, BsModalRef }                     from 'ngx-bootstrap';

@Component({
  selector: 'app-taula-register',
  templateUrl: './taula-register.component.html',
  styleUrls: ['./taula-register.component.css']
})
export class TaulaRegisterComponent implements OnInit {

 
  @Input() items;
  @Input() productesModal:     String[];
  @Input() comboInfoModal: AtributsComboResponse;
  
  @Input() comboGeneral: AtributsComboMap;
  @Input() nouRegistre;
  @Input() comboLlenoModal: boolean;
  
  @Output() evento_list_put:    EventEmitter<any> = new EventEmitter();
  @Output() evento_list_delete: EventEmitter<any> = new EventEmitter();
  @Output() evento_getCombos:   EventEmitter<any> = new EventEmitter();

  @Output() evento_putRegistre:   EventEmitter<any> = new EventEmitter();
  // productEdit:  RegisterResponse;

  bsModalRef: BsModalRef;
  registreToEdit: RegisterResponse;
  // productEdit: RegisterResponse;

  private literals = LiteralsRegistre;

  constructor(
    private traductorService: TranslateService,
              private modalService : BsModalService) {

    traductorService.setDefaultLang('cat');
   }

  ngOnInit() {
    console.log("LIST-COMPONENT");

    
  }

  // actionPut(item)
  // {
  //   console.log(item);
  //   this.evento_list_put.emit(item);
  // }

  openModalToEdit(item: RegisterResponse) {
    
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Modificació del registre',
      lista: [],
      botonCerrar: "Tancar"  
    };

    // this.bsModalRef.content.comboInfoModal = 
    
    this.getCombos(item.tipusProducte);
    this.bsModalRef = this.modalService.show(ModalNoteComponent, {initialState});
    
    // Pass in data directly content atribute after show
    
    this.bsModalRef.content.datos_entrada = item;
    this.bsModalRef.content.datos_salida = item;
    this.bsModalRef.content.producteSelected = this.bsModalRef.content.datos_entrada.tipusProducte;
    this.bsModalRef.content.calibreSelected = this.bsModalRef.content.datos_entrada.calibre;
    this.bsModalRef.content.colorCarnSelected = this.bsModalRef.content.datos_entrada.colorCarn;
    this.bsModalRef.content.qualitatSelected = this.bsModalRef.content.datos_entrada.qualitat;
    this.bsModalRef.content.varietatSelected = this.bsModalRef.content.datos_entrada.varietat;
    this.bsModalRef.content.comboGeneral = this.comboGeneral;
    this.bsModalRef.content.comboInfoModal = this.comboGeneral[this.bsModalRef.content.producteSelected];
  
    this.bsModalRef.content.productesModal = this.productesModal;
    
    
    console.log("Productes Modal: " + this.productesModal);
    
    //console.log(this.bsModalRef.content.datos_entrada);
    // this.bsModalRef.content.datos_entrada = JSON.parse(this.bsModalRef.content.datos_entrada);
    // this.registreToEdit = this.bsModalRef.content.datos_entrada;

    
    console.log("/////////////////////////////");
    // Get out
    

    
    this.bsModalRef.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYES();                                
                              else  
                                this.actionPutNO();                                
      })
  }

  actionPutYES(){
    console.log("ACTION PUT YES")
    // console.log(this.bsModalRef.content.datos_entrada);
    // console.log(this.productEdit);

    // console.log(this.bsModalRef.content.calibreSelected);
    console.log(this.bsModalRef.content.datos_salida);
    // this.bsModalRef.content.datos_salida = this.bsModalRef.content.datos_entrada;
    // this.bsModalRef.content.datos_salida.id = this.bsModalRef.content.datos_entrada.id;
    // this.bsModalRef.content.datos_salida.periode = this.bsModalRef.content.nouPeriode;
    // this.bsModalRef.content.datos_salida.tipusProducte = this.bsModalRef.content.producteSelected;
    // this.bsModalRef.content.datos_salida.varietat = this.bsModalRef.content.varietatSelected;
    // this.bsModalRef.content.datos_salida.calibre = this.bsModalRef.content.calibreSelected;
    // this.bsModalRef.content.datos_salida.qualitat = this.bsModalRef.content.qualitatSelected;
    // this.bsModalRef.content.datos_salida.preuSortida = this.bsModalRef.content.pSortida;
    // this.bsModalRef.content.datos_salida.quantitatVenuda = this.bsModalRef.content.qVenuda;
    // this.bsModalRef.content.datos_salida.colorCarn = this.bsModalRef.content.colorCarnSelected;
    console.log(this.bsModalRef.content.datos_salida);

    this.actionToEdit(this.bsModalRef.content.datos_salida);
    // this.actionToEdit(this.productEdit);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    console.log("ACTION NO PUT")
    console.log(this.bsModalRef.content.datos_salida);
  }

  actionToEdit(datos_salida: RegisterResponse){
    this.evento_putRegistre.emit(datos_salida);
  }

  actionDelete(item)
  {
    console.log("///////////////////////////////////////");
    console.log(item);
    
    this.evento_list_delete.emit(item);
  }

  getCombos(tipusProducte: string){
    console.log("getcombos al obrir modal del prod: " + tipusProducte);

    this.evento_getCombos.emit(tipusProducte);
  }

}
