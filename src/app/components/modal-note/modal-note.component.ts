import { InfoKey } from './../../interfaces/info-key';
import { AtributsComboResponse } from './../../interfaces/atributs-combo-response';
import { RegisterResponse } from './../../interfaces/register-response';
import { Component, OnInit, Output, EventEmitter, ViewChild }        from '@angular/core';

import { BsModalRef }               from "ngx-bootstrap";

import { Subject }                  from 'rxjs';

import { LiteralsRegistre } from './../../literals-registre.enum';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { AtributsComboMap } from '../../interfaces/atributs-combo-map';
import { Periode } from '../../model/periode';
import { MyUser } from '../../interfaces/my-user';
import { HomeComponent } from '../home/home.component';
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
  comboGeneralNoms: AtributsComboMap;
  comboInfoModal: AtributsComboResponse;

  public onClose: Subject<boolean>;
 
  isDisabled: boolean;

  id: number;
  
  qVenuda:  number;
  pSortida: number;

  varietat: string;
  comboLlenoModal: boolean;
  productesModal: string[];
  nouPeriode: Periode;
  producteSelected: string;
  calibreSelected: string;
  qualitatSelected: string;
  colorCarnSelected: string;
  varietatSelected: string;
 
  periodesModal:  Periode[];
  isPinyol: boolean;
  isLlavor: boolean;

  miusuario : MyUser;

  @ViewChild('f') form: any;
  
  private literals = LiteralsRegistre;
  constructor(private translate            : TranslateService,
              public bsModalRef: BsModalRef,
              private HomeComponent        : HomeComponent
              ) 
  { }
 

  ngOnInit() {
    this.isDisabled = true;
    this.onClose = new Subject();
    this.miusuario       = JSON.parse(sessionStorage.getItem("USER"));
    
    setTimeout(() => this.test(), 0);
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  public onConfirm(form) {
    
    console.log(this.bsModalRef.content);
    this.datos_salida.calibre = this.calibreSelected;
    this.datos_salida.qualitat = this.qualitatSelected
    
    if (this.bsModalRef.content.qVenuda != null && this.bsModalRef.content.qVenuda != ""){
      this.datos_salida.quantitatVenuda = this.bsModalRef.content.qVenuda;
    }
    if (this.bsModalRef.content.pSortida != null && this.bsModalRef.content.pSortida != ""){
      this.datos_salida.preuSortida = this.bsModalRef.content.pSortida;
    }// TODO FER TAMBE AMB EL PERIODE
    
    this.datos_salida.tipusProducte = this.bsModalRef.content.producteSelected;
    this.datos_salida.colorCarn = this.colorCarnSelected;
    this.datos_salida.varietat = this.varietatSelected;

    this.datos_salida.periode = this.nouPeriode;
    // console.log("********************************");
    // console.log(this.datos_salida);
    // console.log("********************************");
    this.onClose.next(true);
    
    this.bsModalRef.hide();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  public onCancel(form) {
    
    this.onClose.next(false);

    this.bsModalRef.hide();
  }

  changeSelesctedTipusProducteModal($event)
  {
    let infoTest: any;
    console.log("MODAL EDIT: (MODAL)" + this.producteSelected);
    this.colorCarnSelected="";
    this.qualitatSelected="";
    this.calibreSelected="";
    this.varietatSelected="";
    console.log("ComboInfoModal abans de canviar de producte: ");
    console.log(this.comboInfoModal);
    this.comboInfoModal = this.comboGeneralNoms[this.producteSelected];
    console.log(JSON.stringify(this.comboInfoModal));
    infoTest = JSON.parse(JSON.stringify(this.comboInfoModal)); 
    console.log(infoTest.colorsCarn.length);
    if (infoTest.colorsCarn.length > 1){
      this.isPinyol = true;
      this.isLlavor = false;
      console.log("ES PINYOL");
    } else if (infoTest.varietats.length > 1){
      this.isPinyol = false;
      this.isLlavor = true;
      console.log("ES LLAVOR");
    }
  }

  // changeSelectedPeriodeModal($event)
  // {
  //   this.nouPeriode = this.
  // }

  test(){
    let infoTest: any;

    this.comboInfoModal = this.comboGeneralNoms[this.producteSelected];
    this.isDisabled = false;
    infoTest = JSON.parse(JSON.stringify(this.comboInfoModal)); 
   
    // console.log(infoTest.colorsCarn.length);
    if (infoTest.colorsCarn.length > 0){
      this.isPinyol = true;
      this.isLlavor = false;
      console.log("ES PINYOL");
    } else if (infoTest.varietats.length > 0){
      this.isPinyol = false;
      this.isLlavor = true;
      console.log("ES LLAVOR");
    }
    console.log(this.isDisabled);
  }
}
