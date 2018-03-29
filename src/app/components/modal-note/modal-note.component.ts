import { AtributsComboResponse } from './../../interfaces/atributs-combo-response';
import { RegisterResponse } from './../../interfaces/register-response';
import { Component, OnInit, Output, EventEmitter }        from '@angular/core';

import { BsModalRef }               from "ngx-bootstrap";

import { Subject }                  from 'rxjs';

import { LiteralsRegistre } from './../../literals-registre.enum';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { AtributsComboMap } from '../../interfaces/atributs-combo-map';
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'modal-content',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.css']
})

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

export class ModalNoteComponent implements  OnInit  {

  titulo         : string;
  lista          : any[] = [];
  botonCerrar    : string;

  datos_entrada : RegisterResponse;
  datos_salida  : RegisterResponse;

  item: RegisterResponse;

  comboGeneral: AtributsComboMap;
  comboInfoModal: AtributsComboResponse;

  public onClose: Subject<boolean>;
 
  id: number;
  
  qVenuda:  number;
  pSortida: number;
  varietat: string;
  comboLlenoModal: boolean;
  nouRegistre: any;
  productesModal: string[];
  nouPeriode: string;
  producteSelected: string;
  calibreSelected: string;
  qualitatSelected: string;
  colorCarnSelected: string;
  varietatSelected: string;

  private literals = LiteralsRegistre;
  constructor(private traductorService: TranslateService,
              public bsModalRef: BsModalRef,
              ) 
  { }
 

  ngOnInit() {
    // console.log("MODAL MODAL: ");
    // console.log(this.datos_entrada);
    // console.log("MODAL MODAL: 2 ");
    
    // this.producteSelected = this.datos_entrada.tipusProducte;
    // this.nouPeriode = this.datos_entrada.periode;
    // this.calibreSelected = this.datos_entrada.calibre;
    // this.colorCarnSelected = this.datos_entrada.colorCarn;
    // this.qualitatSelected = this.datos_entrada.qualitat;
    // this.varietatSelected = this.datos_entrada.varietat;
    // this.comboGeneral = this.comboGeneral;
    // this.comboInfoModal = this.comboGeneral[this.producteSelected];
    // this.pSortida = this.datos_entrada.preuSortida;
    // this.qVenuda = this.datos_entrada.quantitatVenuda;

    this.onClose = new Subject();
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  public onConfirm(form) {
    //console.log("ON CONFIRM");
    console.log(this.datos_salida);
    console.log(form.controls['colorsCarn'].value);
    // this.datos_salida.id = this.id;
    // if (this.varietat){
    //   this.nouRegistre = {"tipusProducte" : this.producteSelected,  "varietat" : this.varietatSelected, "qualitat" : this.qualitatSelected, "calibre" : this.calibreSelected, "periode" : this.nouPeriode, "preu_sortida" : this.pSortida, "quantitat_venuda" : this.qVenuda};
    // } else {
    //   this.nouRegistre = {"tipusProducte" : this.producteSelected,  "colorCarn" : this.colorCarnSelected, "qualitat" : this.qualitatSelected, "calibre" : this.calibreSelected, "periode" : this.nouPeriode, "preu_sortida" : this.pSortida, "quantitat_venuda" : this.qVenuda};
    // }
    // this.bsModalRef.content.datos_salida.colorCarn = form.controls['colorsCarn'].value
    this.datos_salida.calibre = this.bsModalRef.content.calibreSelected;
    this.datos_salida.qualitat = this.bsModalRef.content.qualitatSelected
    this.datos_salida.quantitatVenuda = this.bsModalRef.content.qVenuda;
    this.datos_salida.preuSortida = this.bsModalRef.content.pSortida;
    this.datos_salida.tipusProducte = this.bsModalRef.content.producteSelected;
    this.datos_salida.colorCarn = this.bsModalRef.content.colorCarnSelected;
    this.datos_salida.periode = this.bsModalRef.content.nouPeriode;
    // this.datos_salida.varietat = this.bsModalRef.content.;
    // this.datos_salida.varietat = form.controls['eInformant'].value
    // console.log(form.controls['calibres'].value);
    console.log("********************************");
    console.log(this.datos_salida);
    console.log("********************************");
    // console.log(form);
    // console.log("hiiiii");
    // console.log(this.nouRegistre);
    this.onClose.next(true);
    
    this.bsModalRef.hide();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  public onCancel(form) {
    //console.log("ON CANCEL");    
    //console.log(form);
    
    // this.datos_salida = "DATOS SALIDA ON CANCEL";
    this.onClose.next(false);

    this.bsModalRef.hide();
  }

  changeSelesctedTipusProducteModal($event)
  {
    console.log("EMITIMOS EVENTO Cambio de tipusPro: (MODAL)" + $event);
    this.colorCarnSelected="";
    this.qualitatSelected="";
    this.calibreSelected="";
    this.varietatSelected="";
    this.comboInfoModal = this.comboGeneral[this.producteSelected];
  }
}
