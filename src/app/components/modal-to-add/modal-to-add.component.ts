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

  public onClose: Subject<boolean>;
 
  id: number;
  
  qVenuda:  number;
  pSortida: number;

  comboLlenoModal: boolean;
  nouRegistre: RegisterResponse;
  productesModal: InfoKey[];
  nouPeriode: string;
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
    this.datos_salida.tipusProducte = this.bsModalRef.content.producteSelected.clau;
    this.datos_salida.periode = this.bsModalRef.content.nouPeriode;
    // this.datos_salida.varietat = form.controls['eInformant'].value
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

  changeSelesctedTipusProducteModal()
  {
    console.log("MODAL TO ADD: (MODAL | ADD)" + JSON.parse(JSON.stringify(this.producteSelected)));
    
    let test: any;
    test = this.producteSelected;
    this.getCombosModal(test.clau);
    this.colorCarnSelected="";
    this.qualitatSelected="";
    this.calibreSelected="";
    this.varietatSelected="";

    console.log(test.subGrup);
    if (test.subGrup == 'PI'){
      console.log("ES PINYOL");
      this.isPinyol = true;
      this.isLlavor = false;
    }else if (test.subGrup == "LL"){
      console.log("ES LLAVOR");
      this.isPinyol = false;
      this.isLlavor = true;
    }

    console.log(this.comboInfoModal +" - " + this.isPinyol + " - " + this.isLlavor + " - " + this.comboGeneral );
    // console.log(JSON.stringify(this.comboGeneral));
    let comboEnModal: any;
    comboEnModal = this.comboGeneral;
    this.comboInfoModal = comboEnModal[test.clau];

    console.log(this.comboInfoModal +" - " + this.isPinyol + " - " + this.isLlavor + " - " + this.comboGeneral );
    
    // comboInfoModal = comboEnModal[test.Clau];
    
  }

  getCombosModal(tipusProducte: String)
  {
    console.log("getcombosModal en pare: (MODAL) " + tipusProducte);
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getCombos(tipusProducte)
      .subscribe ( respuesta => { this.comboInfoModal = respuesta;
                                  this.TrazaService.dato("Combos", "API GET Combo OK (ON MODAL)", this.comboInfoModal);
                                  
                                },
                  error =>      { this.TrazaService.error("Combos", "API GET Combo KO (ON MODAL)", error); } 
      );   
  }
}