import { HomeComponent } from './../home/home.component';
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
import { AuthorizationService } from '../../services/authorization.service';
import { RegisterService } from '../../services/register.service';
import { TrazaService } from '../../services/traza.service';
import { Periode } from '../../model/periode';
import { MyUser } from '../../interfaces/my-user';

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

  miusuario:  MyUser;
  private literals = LiteralsRegistre;
  constructor(private translate            : TranslateService,
              public bsModalRef: BsModalRef,
              private AuthorizationService: AuthorizationService, 
               private RegisterService     : RegisterService, 
               private TrazaService        : TrazaService,
               private HomeComponent        : HomeComponent
              ) 
  { }
 

  ngOnInit() {
    // console.log("MODAL MODAL: MODAL OBERT");
    this.notErrorPeriode = true;
    this.onClose = new Subject();
    // console.log(this.HomeComponent.miusuario);
    // this.HomeComponent.whoami();
    this.miusuario            = JSON.parse(sessionStorage.getItem("USER"));
    console.log(this.miusuario);
    // console.log(this.HomeComponent.miusuario);
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  public onConfirm(form) {

    // console.log(form);
    // console.log("wtf");
    
    this.datos_salida.calibre = this.bsModalRef.content.calibreSelected;
    this.datos_salida.colorCarn = this.bsModalRef.content.colorCarnSelected;
    this.datos_salida.qualitat = this.bsModalRef.content.qualitatSelected;
    this.datos_salida.varietat = this.bsModalRef.content.varietatSelected;
    this.datos_salida.quantitatVenuda = this.bsModalRef.content.qVenuda;
    this.datos_salida.preuSortida = this.bsModalRef.content.pSortida;
    this.datos_salida.tipusProducte = this.bsModalRef.content.producteSelected.nom;
    this.datos_salida.periode = this.bsModalRef.content.nouPeriode;
    this.datos_salida.usuName = this.miusuario.user;
    // console.log(this.datos_salida);
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
    
    if (this.nouPeriode.tipusPeriode == 'S'){
      // console.log("ES PRODUCTE SETMANAL");
      this.getProductesModalByType(this.nouPeriode.tipusPeriode);
      this.colorCarnSelected="";
      this.qualitatSelected="";
      this.calibreSelected="";
      this.varietatSelected="";
      this.isPinyol = false;
      this.isLlavor = false;
    }else if(this.nouPeriode.tipusPeriode == 'Q'){
      // console.log("ES PRODUCTE QUINZENAL");
      this.getProductesModalByType(this.nouPeriode.tipusPeriode);
      this.colorCarnSelected="";
      this.qualitatSelected="";
      this.calibreSelected="";
      this.varietatSelected="";
      this.isPinyol = false;
      this.isLlavor = false;
    }
  }

  changeSelesctedTipusProducteModal($event)
  {
    
    let test: any;
    test = this.producteSelected;
    this.getCombosModal(test.clau);
    this.colorCarnSelected="";
    this.qualitatSelected="";
    this.calibreSelected="";
    this.varietatSelected="";
    if (test.subGrup == 'PI'){
      this.isPinyol = true;
      this.isLlavor = false;
    }else if (test.subGrup == "LL"){
      this.isPinyol = false;
      this.isLlavor = true;
    }
  }

  getCombosModal(tipusProducte: String)
  {
    // console.log("getcombosModal en pare: (MODAL) " + tipusProducte);
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getCombosModalToAdd(tipusProducte)
      .subscribe ( respuesta => { this.comboInfoModal = respuesta;
                                  this.TrazaService.dato("Combos", "API GET Combo OK (ON MODAL)", this.comboInfoModal);
                                  
                                },
                  error =>      { this.TrazaService.error("Combos", "API GET Combo KO (ON MODAL)", error); } 
      );   
    }
  }

  getPeriodesByProd(subGrup: String){
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getPeriodesByProd(subGrup)
      .subscribe ( respuesta => { this.periodesModal = respuesta;

                                   this.TrazaService.dato("Periodes per producte", "API GET PERIODES OK", this.periodesModal);
                                },
                  error =>      { this.TrazaService.error("Periodes per producte", "API GET PERIODES KO", error); } 
      );
    }
  }

  getProductesModalByType(subGrup: String)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getProductesModalByType(subGrup)
      .subscribe ( respuesta => { this.productesModal = respuesta;

                                  this.TrazaService.dato("Productes MODAL", "API GET Registres OK", this.productesModal);
                                },
                  error =>      { this.TrazaService.error("Productes MODAL", "API GET Registres KO", error); } 
      );
    }
  }
}