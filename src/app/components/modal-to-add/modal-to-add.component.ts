import { Empressa } from './../../model/empressa';
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
import { EmpressaService } from '../../services/empressa.service';
import { HttpParams } from '@angular/common/http';

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
  eInformant: string;
  uInformant: string;
  miusuario:  MyUser;
  isUser: Boolean=true;

  empresses:  String[];
  usersList:  String[];
  private literals = LiteralsRegistre;
  constructor(private translate            : TranslateService,
              public bsModalRef: BsModalRef,
              private AuthorizationService: AuthorizationService, 
               private RegisterService     : RegisterService, 
               private TrazaService        : TrazaService,
               private HomeComponent        : HomeComponent,
               private EmpressaService      :EmpressaService
              ) 
  { 

    this.miusuario            = JSON.parse(sessionStorage.getItem("USER"));
    
    this.eInformant = this.miusuario.empresa.codi;
  }
 

  ngOnInit() {

    this.notErrorPeriode = true;
    this.onClose = new Subject();

    this.miusuario            = JSON.parse(sessionStorage.getItem("USER"));
    console.log(this.miusuario);

    if (this.eInformant == 'Administració'){
      this.getEmpresses();
      this.isUser=false;
      this.eInformant = '';
      let params = new HttpParams();
      this.getUsersByEmp(params);
    }else{
      this.empresses = new Array<String>();
      this.usersList = new Array<String>();
      this.empresses.push(this.miusuario.empresa.codi);
      this.uInformant = this.miusuario.user;
      this.usersList.push(this.miusuario.user);
      this.isUser=true;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  public onConfirm(form) {


    this.datos_salida.calibre = this.bsModalRef.content.calibreSelected;
    this.datos_salida.colorCarn = this.bsModalRef.content.colorCarnSelected;
    this.datos_salida.qualitat = this.bsModalRef.content.qualitatSelected;
    this.datos_salida.varietat = this.bsModalRef.content.varietatSelected;
    this.datos_salida.quantitatVenuda = this.bsModalRef.content.qVenuda;
    this.datos_salida.preuSortida = this.bsModalRef.content.pSortida;
    this.datos_salida.tipusProducte = this.bsModalRef.content.producteSelected.nom;
    this.datos_salida.periode = this.bsModalRef.content.nouPeriode;
    this.datos_salida.usuName = this.uInformant;

    this.onClose.next(true);
    
    this.bsModalRef.hide();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  public onCancel(form) {
    
    this.onClose.next(false);

    this.bsModalRef.hide();
  }

  changeSelectedPeriodeModal($event){
    console.log(this.producteSelected);
    if (this.nouPeriode.tipusPeriode == 'S' && this.producteSelected.subGrup != 'PI'){
      console.log("ES PRODUCTE SETMANAL");

      this.colorCarnSelected="";
      this.qualitatSelected="";
      this.calibreSelected="";
      this.varietatSelected="";
      this.producteSelected =null;
      this.isPinyol = false;
      this.isLlavor = false;
    }else if(this.nouPeriode.tipusPeriode == 'Q' && this.producteSelected.subGrup != 'LL'){
      console.log("ES PRODUCTE QUINZENAL");

      this.colorCarnSelected="";
      this.qualitatSelected="";
      this.calibreSelected="";
      this.varietatSelected="";
      this.producteSelected =null;
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
    console.log(this.eInformant);
    
    if (test.subGrup == 'PI'){
      this.isPinyol = true;
      this.isLlavor = false;
    }else if (test.subGrup == "LL"){
      this.isPinyol = false;
      this.isLlavor = true;
    }
    let params = new HttpParams();
    params = params.set('empresa', this.eInformant);
    params = params.set('tipusProducte', test.nom);
    console.log(params);
    this.getPeriodesByProdAndEmp(params);
    
  }

  changeSelectedEmpresa(eInformant)
  {
    let params = new HttpParams();
    if (this.eInformant && this.eInformant != 'Totes'){params = params.set('eInformant', this.eInformant);}
    this.uInformant="";
    this.getProductesModal(this.eInformant);
    this.getUsersByEmp(params);
  }
  getCombosModal(tipusProducte: String)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getCombosModalToAdd(tipusProducte)
      .subscribe ( respuesta => { this.comboInfoModal = respuesta;
                                  this.TrazaService.dato("Combos", "API GET Combo OK (ON MODAL)", this.comboInfoModal);
                                  
                                },
                  error =>      { this.TrazaService.error("Combos", "API GET Combo KO (ON MODAL)", error); } 
      );   
    }
  }

  getPeriodesByProdAndEmp(params: HttpParams){
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getPeriodesDisponiblesByProdAndEmp(params)
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

  getEmpresses()
  {
    if (this.AuthorizationService.is_logged()){
      this.EmpressaService.getEmpressaActivaNoTotes()
      .subscribe ( respuesta => { this.empresses = respuesta;

                                  // console.log(this.empresses);
                                   this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.empresses);
                                },
                  error =>      { this.TrazaService.error("EMPRESSES NOM", "API GET EMPRESSES KO", error); } 
      );
    }
  }

  getUsersByEmp(params: HttpParams)
  {
    if (this.AuthorizationService.is_logged())
    {
      this.RegisterService.getUsersByEmp(params)
      .subscribe ( respuesta => { this.usersList = respuesta;  
                                  // console.log(this.usersList);
                                  this.TrazaService.dato("USERS", "API USERS OK(",this.usersList); 
                                },
                  error =>      { this.TrazaService.error("USERS", "API USERS KO", error); } 
      );
    }
  }

  getProductesModal(codiEmp:  string)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getProductesModalByEmp(codiEmp)
      .subscribe ( respuesta => { this.productesModal = respuesta;

                                  this.TrazaService.dato("Productes MODAL", "API GET Registres OK", this.productesModal);
                                },
                  error =>      { this.TrazaService.error("Productes MODAL", "API GET Registres KO", error); } 
      );
    }
  }
}