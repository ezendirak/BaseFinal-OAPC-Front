import { InfoKey } from './../../interfaces/info-key';
import { AtributsComboResponse } from './../../interfaces/atributs-combo-response';
import { RegisterResponse } from './../../interfaces/register-response';
import { Component, OnInit, Output, EventEmitter }        from '@angular/core';

import { BsModalRef }               from "ngx-bootstrap";

import { Subject }                  from 'rxjs';

import { LiteralsRegistre } from './../../literals-registre.enum';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { AtributsComboMap } from '../../interfaces/atributs-combo-map';
import { AuthorizationService } from '../../services/authorization.service';
import { RegisterService } from '../../services/register.service';
import { TrazaService } from '../../services/traza.service';
import { Periode } from '../../model/periode';
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'modalAdd-content',
  templateUrl: './modal-to-add.component.html',
  styleUrls: ['./modal-to-add.component.css']
})

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

export class ModalToAddComponent implements  OnInit  {

  @Output() evento_canviProduct:    EventEmitter<any> = new EventEmitter();

  titulo         : string;
  lista          : any[] = [];
  botonCerrar    : string;

  datos_entrada : RegisterResponse;
  datos_salida  : RegisterResponse;
  comboGeneral: AtributsComboMap;

  comboInfoModal: AtributsComboResponse;

  periodesModal:  Periode[];
  
  public onClose: Subject<boolean>;
 
  id: number;
  
  qVenuda:  number;
  pSortida: number;

  notErrorPeriode: boolean;

  comboLlenoModal: boolean;
  nouRegistre: RegisterResponse;
  productesModal: InfoKey[];
  nouPeriode: Periode;
  producteSelected: InfoKey;
  calibreSelected: string;
  qualitatSelected: string;
  colorCarnSelected: string;
  varietatSelected: string;

  isPinyol: boolean;
  isLlavor: boolean;

  private literals = LiteralsRegistre;
  constructor(private traductorService: TranslateService,
              public bsModalRef: BsModalRef,
              private AuthorizationService: AuthorizationService, 
               private RegisterService     : RegisterService, 
               private TrazaService        : TrazaService
              ) 
  { }
 

  ngOnInit() {
    console.log("MODAL MODAL: MODAL OBERT");
    // console.log(this.producteSelected);
    this.notErrorPeriode = true;
    this.onClose = new Subject();
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  public onConfirm(form) {

    console.log(form);

    // this.datos_salida.id = this.id;
    // if (this.varietat){
    //   this.nouRegistre = {"tipusProducte" : this.producteSelected,  "varietat" : this.varietatSelected, "qualitat" : this.qualitatSelected, "calibre" : this.calibreSelected, "periode" : this.nouPeriode, "preu_sortida" : this.pSortida, "quantitat_venuda" : this.qVenuda};
    // } else {
    //   this.nouRegistre = {"tipusProducte" : this.producteSelected,  "colorCarn" : this.colorCarnSelected, "qualitat" : this.qualitatSelected, "calibre" : this.calibreSelected, "periode" : this.nouPeriode, "preu_sortida" : this.pSortida, "quantitat_venuda" : this.qVenuda};
    // }
    // console.log(form.controls['colorsCarn'].value);
    
    this.datos_salida.calibre = this.bsModalRef.content.calibreSelected;
    this.datos_salida.colorCarn = this.bsModalRef.content.colorCarnSelected;
    this.datos_salida.qualitat = this.bsModalRef.content.qualitatSelected
    this.datos_salida.varietat = this.bsModalRef.content.varietatSelected;
    this.datos_salida.quantitatVenuda = this.bsModalRef.content.qVenuda;
    this.datos_salida.preuSortida = this.bsModalRef.content.pSortida;
    this.datos_salida.tipusProducte = this.bsModalRef.content.producteSelected.nom;
    this.datos_salida.periode = this.bsModalRef.content.nouPeriode.id;
    // this.datos_salida.varietat = form.controls['eInformant'].value
    console.log(this.datos_salida);
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

  changeSelectedPeriodeModal($event){
    if (this.notErrorPeriode == false){
      this.notErrorPeriode = true;
    }
    if (this.nouPeriode.tipusPeriode == 'S' && this.producteSelected.subGrup != 'PI'){
      //ERROR NO ES DEL TIPUS DE PERIODE SELECCIONAT
      console.log("ERROR NO ES DEL TIPUS DE PERIODE SELECCIONAT");
      this.notErrorPeriode = false;

    }else if(this.nouPeriode.tipusPeriode == 'Q' && this.producteSelected.subGrup != 'LL'){
      //ERROR NO ES DEL TIPUS DE PERIODE SELECCIONAT
      console.log("ERROR NO ES DEL TIPUS DE PERIODE SELECCIONAT");
      this.notErrorPeriode = false;
    }
  }

  changeSelesctedTipusProducteModal($event)
  {
    // console.log("MODAL TO ADD: (MODAL | ADD)" + JSON.parse(JSON.stringify(this.producteSelected)));
    console.log("WTF");
    let test: any;
    test = this.producteSelected;
    this.getCombosModal(test.clau);
    this.colorCarnSelected="";
    this.qualitatSelected="";
    this.calibreSelected="";
    this.varietatSelected="";

    console.log(test.subGrup);
    if (test.subGrup == 'PI'){
      this.isPinyol = true;
      this.isLlavor = false;
      this.getPeriodesByProd(test.subGrup);
      if (this.nouPeriode.tipusPeriode != null){
        
        if (this.nouPeriode.tipusPeriode != 'S'){
          this.nouPeriode=null;
        }
      }
    }else if (test.subGrup == "LL"){
      this.isPinyol = false;
      this.isLlavor = true;
      this.getPeriodesByProd(test.subGrup);
      if (this.nouPeriode.tipusPeriode != null){
        
        if (this.nouPeriode.tipusPeriode != 'Q'){
          this.nouPeriode=null;
        }
      }
    }

    // console.log(this.comboInfoModal +" - " + this.isPinyol + " - " + this.isLlavor + " - " + this.comboGeneral );
    // console.log(this.comboInfoModal);
    // let comboEnModal: any;
    // comboEnModal = this.comboGeneral;
    // this.comboInfoModal = comboEnModal[test.clau];

    // console.log(this.comboInfoModal +" - " + this.isPinyol + " - " + this.isLlavor + " - " + this.comboGeneral );
    
    // comboInfoModal = comboEnModal[test.Clau];
    
  }

  getCombosModal(tipusProducte: String)
  {
    console.log("getcombosModal en pare: (MODAL) " + tipusProducte);
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getCombosModalToAdd(tipusProducte)
      .subscribe ( respuesta => { this.comboInfoModal = respuesta;
                                  this.TrazaService.dato("Combos", "API GET Combo OK (ON MODAL)", this.comboInfoModal);
                                  
                                },
                  error =>      { this.TrazaService.error("Combos", "API GET Combo KO (ON MODAL)", error); } 
      );   
  }

  getPeriodesByProd(subGrup: String){
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getPeriodesByProd(subGrup)
      .subscribe ( respuesta => { this.periodesModal = respuesta;

                                   this.TrazaService.dato("Periodes per producte", "API GET PERIODES OK", this.periodesModal);
                                },
                  error =>      { this.TrazaService.error("Periodes per producte", "API GET PERIODES KO", error); } 
      );
  }
}