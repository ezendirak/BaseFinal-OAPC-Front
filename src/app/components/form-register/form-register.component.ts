import { InfoKey } from './../../interfaces/info-key';
import { RegisterResponse } from './../../interfaces/register-response';
import { LiteralsRegistre } from './../../literals-registre.enum';

import { AtributsComboResponse } from './../../interfaces/atributs-combo-response';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { AtributsComboMap } from '../../interfaces/atributs-combo-map';
import { ModalToAddComponent } from '../modal-to-add/modal-to-add.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {

  
  
  @Input()  titulo_form:    string;
  @Input()  productes:      string[];
  @Input()  comboInfo:      AtributsComboResponse;
  @Input()  comboLleno:     Boolean;
  @Input()  item:           RegisterResponse;
  @Input()  comboGeneral:   AtributsComboMap;
  @Input()  comboGeneralModalToAdd: AtributsComboMap;
  @Input()  comboInfoModal: AtributsComboResponse;
  @Input()  productesModal: string[];
  @Input()  isPinyol:       Boolean;
  @Input()  isLlavor:       Boolean;


  @Output() evento_form1: EventEmitter<any> = new EventEmitter();
  @Output() evento_tProduct: EventEmitter<any> = new EventEmitter();
  @Output() evento_form_afegir: EventEmitter<any> = new EventEmitter();
  @Output() evento_getCombos: EventEmitter<any> = new EventEmitter();
  
  filtros: any;

  referencia: number;
  periode: string;
  eInformant: string;
  uInformant: string;
  tipusProducte: string;
  varietat: string;
  qualitat: string;
  calibre: string;
  qVenuda: number;
  pSortida: number;
  tancada: string;
  
  selectedTipusProducte:  InfoKey;
  selectedQualitat:       string;
  selectedKalibre:        string;
  selectedColorCarn:      string;
  
  bsModalRefAdd: BsModalRef;
  
  usuariActual: String;

 private literals = LiteralsRegistre;
  constructor(private traductorService: TranslateService,
              private BsModalRefAdd: BsModalService) {
    
    traductorService.setDefaultLang('cat');
    this.usuariActual = 'Pol Garcia';
  }

  
  
  ngOnInit() {    
  }


  switchLanguage(language: string){
    this.traductorService.use(language);
  }

  onclick($event)
  {
    console.log("CAPTURADO CLICK EN FORMULARIO");
    console.log("EMITIMOS EVENTO eventoRegistreClicked");
    // this.filtros = { "referencia": this.referencia, "periode" : this.periode, "eInformant" : this.eInformant, "uInformant" : this.uInformant, "tipusProducte" : this.selectedTipusProducte,  "varietat" : this.varietat, "qualitat" : this.selectedQualitat, "calibre" : this.selectedKalibre, "qVenuda" : this.qVenuda, "pSortida" : this.pSortida, "tancada" : this.tancada};
     this.filtros = {"tipusProducte" : this.selectedTipusProducte,  "colorCarn" : this.selectedColorCarn, "qualitat" : this.selectedQualitat, "calibre" : this.selectedKalibre};
     
    
     let params = new HttpParams();
     if(this.selectedTipusProducte){
      params = params.set('tipusProducte', this.selectedTipusProducte.nom);
     }
    // params = params.set('tipusProducte', this.selectedTipusProducte).set('colorCarn', this.selectedColorCarn).set('qualitat', this.selectedQualitat).set('calibre', this.selectedKalibre);
     if (this.selectedColorCarn){
       params = params.set('colorCarn', this.selectedColorCarn);
     }
     if (this.selectedQualitat){
     params = params.set('qualitat', this.selectedQualitat);
     }
     if (this.selectedKalibre){
    params = params.set('calibre', this.selectedKalibre);
     }
      //  this.evento_form1.emit(JSON.stringify(this.filtros));
      console.log(params);
    this.evento_form1.emit(params);
  }

  // provaOnChange($event){
  //   this.tipusProducte = this.selectedTipusProducte.clau;
  //   console.log("PROVA ON CHANGE: ");
  //   console.log($event.Clau);
  //   console.log(this.tipusProducte);
  //   console.log("FI DE PROVA ON CHANGE");
  // }

  afegirProd($event){
    console.log("Test event: "+ $event);

    this.filtros = {"tipusProducte" : this.selectedTipusProducte.nom,  "colorCarn" : this.selectedColorCarn, "qualitat" : this.selectedQualitat, "calibre" : this.selectedKalibre, "periode" : this.periode, "quantitatVenuda" : this.qVenuda, "preuSortida" : this.pSortida};
    console.log(this.filtros);
    

    //  console.log("Afegir prod: " + params);
    //  console.log("Afegir OBJECTE " + this.item);
    this.evento_form_afegir.emit(this.filtros);
  }

  openModalToAdd($event){
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Afegir nou registre',
      lista: [],
      botonCerrar: "Tancar"  
    };

    // this.bsModalRef.content.comboInfoModal = 
    console.log(this.item);
    // this.getCombos(item.tipusProducte);
    this.bsModalRefAdd = this.BsModalRefAdd.show(ModalToAddComponent, {initialState});
    
    // Pass in data directly content atribute after show
    this.bsModalRefAdd.content.datos_salida = {id : null, periode : null, tipusProducte : null, eInformant : null, colorCarn : null, calibre : null, qualitat : null, varietat : null, quantitatVenuda: null, preuSortida: null};
    
    console.log("*/*/*/*/*/*/*/*/*/*");
    console.log(this.comboGeneral);
    this.bsModalRefAdd.content.comboGeneral = this.comboGeneralModalToAdd;
    this.bsModalRefAdd.content.comboInfoModal = this.comboInfoModal;
    // this.bsModalRefAdd.content.isPinyol = this.isPinyol;
    // this.bsModalRefAdd.content.isLlavor = this.isLlavor;
    console.log("ComboInfoModal al abrir el popup: ");
    console.log(this.bsModalRefAdd.content.comboInfoModal);
    console.log(this.comboInfoModal);
    // this.bsModalRefAdd.content.comboInfoModal = this.comboGeneral[this.bsModalRefAdd.content.producteSelected];
    this.bsModalRefAdd.content.productesModal = this.productesModal;
    console.log(this.bsModalRefAdd.content.comboGeneral);
    console.log(this.bsModalRefAdd.content.datos_entrada);
    // this.bsModalRef.content.datos_entrada = JSON.parse(this.bsModalRef.content.datos_entrada);
    // this.registreToEdit = this.bsModalRef.content.datos_entrada;

    
    console.log("/////////////////////////////");
    // Get out
    

    
    this.bsModalRefAdd.content.onClose
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
    console.log(this.bsModalRefAdd.content.datos_salida);
    console.log(this.item);
    // this.bsModalRefAdd.content.datos_salida = this.item;
   
    // this.bsModalRefAdd.content.datos_salida.periode = this.bsModalRefAdd.content.nouPeriode;
    // this.bsModalRefAdd.content.datos_salida.tipusProducte = this.bsModalRefAdd.content.producteSelected;
    // this.bsModalRefAdd.content.datos_salida.varietat = this.bsModalRefAdd.content.varietatSelected;
    // this.bsModalRefAdd.content.datos_salida.calibre = this.bsModalRefAdd.content.calibreSelected;
    // this.bsModalRefAdd.content.datos_salida.qualitat = this.bsModalRefAdd.content.qualitatSelected;
    // this.bsModalRefAdd.content.datos_salida.preuSortida = this.bsModalRefAdd.content.pSortida;
    // this.bsModalRefAdd.content.datos_salida.quantitatVenuda = this.bsModalRefAdd.content.qVenuda;
    // this.bsModalRefAdd.content.datos_salida.colorCarn = this.bsModalRefAdd.content.colorCarnSelected;
    console.log(this.bsModalRefAdd.content.datos_salida);

    this.actionToAdd(this.bsModalRefAdd.content.datos_salida);
    // this.actionToEdit(this.productEdit);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    console.log("ACTION NO PUT")
    console.log(this.bsModalRefAdd.content.datos_salida);
  }

  actionToAdd(registro: RegisterResponse){
    this.evento_form_afegir.emit(registro);
  }

  changeSelectedTipusProducte($event)
  {
    console.log("EMITIMOS EVENTO Cambio de tipusPro: " + $event + this.selectedTipusProducte);
    this.evento_tProduct.emit(this.selectedTipusProducte);
    this.selectedColorCarn="";
    this.selectedQualitat="";
    this.selectedKalibre="";
  }

  getCombos(tipusProducte: string){
    console.log("getcombos al obrir modal del prod: " + tipusProducte);

    this.evento_getCombos.emit(tipusProducte);
  }



}
