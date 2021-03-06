import { Periode } from './../../model/periode';
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
import { ModalNoComComponent } from '../modal-no-com/modal-no-com.component';
import { MyUser } from '../../interfaces/my-user';
import { AuthorizationService } from '../../services/authorization.service';
import { EmpressaService } from '../../services/empressa.service';
import { TrazaService } from '../../services/traza.service';
import { RegisterService } from '../../services/register.service';
import { ModalToAddMasivoComponent } from '../modal-to-add-masivo/modal-to-add-masivo.component';


@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {

  
  
  @Input()  titulo_form:    string;
  @Input()  productes:      InfoKey[];
  @Input()  comboInfo:      AtributsComboResponse;
  @Input()  comboLleno:     Boolean;
  @Input()  item:           RegisterResponse;
  @Input()  comboGeneral:   AtributsComboMap;
  @Input()  comboGeneralModalToAdd: AtributsComboMap;
  @Input()  comboInfoModal: AtributsComboResponse;
  @Input()  productesModal: string[];
  @Input()  isPinyol:       Boolean;
  @Input()  isLlavor:       Boolean;
  @Input()  periodes:       Periode[];
  @Input()  periodesModal:  Periode[];
  @Input()  usersList:      String[];
  
  @Input()  miusuario:      MyUser;

  
  @Output() evento_form1: EventEmitter<any> = new EventEmitter();
  @Output() evento_tProduct: EventEmitter<any> = new EventEmitter();
  @Output() evento_form_afegir: EventEmitter<any> = new EventEmitter();
  @Output() evento_getCombos: EventEmitter<any> = new EventEmitter();
  @Output() evento_postNoComPer: EventEmitter<any> = new EventEmitter();
  @Output() evento_changeEmp:    EventEmitter<any> = new EventEmitter();
  

  @Output() evento_AfegirXLS: EventEmitter<any> = new EventEmitter();
  // @Output() evento_DescarregarXLS: EventEmitter<any> = new EventEmitter();

  filtros: any;

  referencia: number;
  periode: Periode;
  eInformant: string;
  uInformant: string;
  tipusProducte: string;
  varietat: string;
  qualitat: string;
  calibre: string;
  qVenuda: number;
  qVenuda2: number;
  pSortida: number;
  pSortida2: number;
  tancada: string;
  
  empresses:      String[];

  selectedTipusProducte:  InfoKey;
  selectedQualitat:       string;
  selectedKalibre:        string;
  selectedColorCarn:      string;
  selectedVarietat:       string;

  bsModalRefAdd: BsModalRef;
  
  usuariActual: MyUser;
  isUser: Boolean=true;
 private literals = LiteralsRegistre;
  constructor(private translate            : TranslateService,
              private BsModalRefAdd        : BsModalService,
              private AuthorizationService  : AuthorizationService,
              private EmpressaService       : EmpressaService,
              private TrazaService          : TrazaService,
              private RegisterService       : RegisterService) {
    
    this.miusuario            = JSON.parse(sessionStorage.getItem("USER"));
    translate.setDefaultLang('cat');
    
    this.eInformant = this.miusuario.empresa.codi;
  }

  
  
  ngOnInit() {
    if (this.eInformant == 'Administració'){
      this.getEmpresses();
      this.isUser=false;
      this.eInformant = '';
      let params = new HttpParams();
      this.evento_changeEmp.emit(params);
    }else{
      this.empresses = new Array<String>();
      this.usersList = new Array<String>();
      this.empresses.push(this.miusuario.empresa.codi);
      this.uInformant = this.miusuario.user;
      this.usersList.push(this.miusuario.user);
      this.isUser=true;
    }    
   
  }

  onclick($event)
  {
    // console.log("CAPTURADO CLICK EN FORMULARIO");
    // console.log("EMITIMOS EVENTO eventoRegistreClicked");
    
     let params = new HttpParams();
     if(this.selectedTipusProducte && this.selectedTipusProducte.nom != 'Tots'){
      params = params.set('tipusProducte', this.selectedTipusProducte.nom);
     }
     if(this.periode && this.periode.tipusPeriode != 'Tots'){
      params = params.set('periode', this.periode.numPeriode + this.periode.tipusPeriode);
     }
    // params = params.set('tipusProducte', this.selectedTipusProducte).set('colorCarn', this.selectedColorCarn).set('qualitat', this.selectedQualitat).set('calibre', this.selectedKalibre);
     if (this.selectedColorCarn && this.selectedColorCarn != '-'){
        params = params.set('colorCarn', this.selectedColorCarn);
     }
     if (this.selectedQualitat && this.selectedQualitat != '-'){
        params = params.set('qualitat', this.selectedQualitat);
     }
     if (this.selectedKalibre && this.selectedKalibre != '-'){
        params = params.set('calibre', this.selectedKalibre);
     }
     if (this.selectedVarietat && this.selectedVarietat != '-'){
      params = params.set('varietat', this.selectedVarietat);
     }
     if (this.qVenuda){
      params = params.set('qVenuda', this.qVenuda.toString());
      console.log(this.qVenuda);
     }
     if (this.qVenuda2){
      params = params.set('qVenuda2', this.qVenuda2.toString());
     }
     if (this.pSortida){
      params = params.set('pSortida', this.pSortida.toString());
      console.log(this.qVenuda);
     }
     if (this.pSortida2){
      params = params.set('pSortida2', this.pSortida2.toString());
     }
     if (this.eInformant && this.eInformant != 'Totes'){
      params = params.set('eInformant', this.eInformant);
     }
     if (this.uInformant && this.uInformant != ''){
      params = params.set('uInformant', this.uInformant);
     }

    // console.log(params);
    // window.scrollTo(0, 560);
    window.scrollTo({
      top: 580,
      behavior: "smooth"
    });
    this.evento_form1.emit(params);
  }

  afegirProd($event){
    this.filtros = {"tipusProducte" : this.selectedTipusProducte.nom,  "colorCarn" : this.selectedColorCarn, "qualitat" : this.selectedQualitat, "calibre" : this.selectedKalibre, "periode" : this.periode, "quantitatVenuda" : this.qVenuda, "preuSortida" : this.pSortida};
    
    this.evento_form_afegir.emit(this.filtros);
  }

  openModalToAdd($event){
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Afegir nou registre',
      lista: [],
      botonCerrar: "Tancar"  
    };
 
    this.bsModalRefAdd = this.BsModalRefAdd.show(ModalToAddComponent, {initialState});
    
    // Pass in data directly content atribute after show
    this.bsModalRefAdd.content.datos_salida = {id : null, periode : null, tipusProducte : null, uInformant : this.miusuario.user, colorCarn : null, calibre : null, qualitat : null, varietat : null, quantitatVenuda: null, preuSortida: null};
    // 
    this.bsModalRefAdd.content.comboGeneral = this.comboGeneralModalToAdd;
    this.bsModalRefAdd.content.comboInfoModal = this.comboInfoModal;
    this.bsModalRefAdd.content.productesModal = this.productesModal;

    this.bsModalRefAdd.content.periodesModal = this.periodesModal;

    // Get out
    

    
    this.bsModalRefAdd.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYES();                                
                              else  
                                this.actionPutNO();                                
      })
  }

  actionPutYES(){
    // console.log("ACTION PUT YES")
    // console.log(this.bsModalRefAdd.content.datos_salida);
    this.actionToAdd(this.bsModalRefAdd.content.datos_salida);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    // console.log("ACTION NO PUT")
    // console.log(this.bsModalRefAdd.content.datos_salida);
  }

  actionToAdd(registro: RegisterResponse){
    this.evento_form_afegir.emit(registro);
  }

  changeSelectedTipusProducte($event: InfoKey)
  {
    // console.log("EMITIMOS EVENTO Cambio de tipusPro: " + $event + this.selectedTipusProducte.subGrup);
    this.evento_tProduct.emit(this.selectedTipusProducte);
    
    this.selectedColorCarn="";
    this.selectedQualitat="";
    this.selectedKalibre="";
    
  }

  changeSelectedEmpresa($event: string)
  {
    let params = new HttpParams();
    if (this.eInformant && this.eInformant != 'Totes'){params = params.set('eInformant', this.eInformant);}
    this.uInformant="";
    // this.getProductesModal(this.eInformant);
    this.evento_changeEmp.emit(params);
  }

  getCombos(tipusProducte: string){
    // console.log("getcombos al obrir modal del prod: " + tipusProducte);

    this.evento_getCombos.emit(tipusProducte);
  }


  
  openModalToNoCom($event){
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Periode de No Comercialitzacio',
      lista: [],
      botonCerrar: "Tancar"  
    };
 
    // console.log(this.item);
    this.bsModalRefAdd = this.BsModalRefAdd.show(ModalNoComComponent, {initialState});
    
    // Pass in data directly content atribute after show
    
    this.bsModalRefAdd.content.productesModal = this.productesModal;

    this.bsModalRefAdd.content.periodesModal = this.periodesModal;

    // Get out
    

    
    this.bsModalRefAdd.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYESNoCom();                                
                              else  
                                this.actionPutNONoCom();                                
      })
  }

  actionPutYESNoCom(){
    // console.log(this.bsModalRefAdd.content.registreNoCom);
    this.evento_postNoComPer.emit(this.bsModalRefAdd.content.registreNoCom);
    // this.evento_postNoComPer.emit(this.bsModalRefAdd.content.params);
  }

  actionPutNONoCom(){

  }

  getEmpresses()
  {
    if (this.AuthorizationService.is_logged()){
      this.EmpressaService.getEmpressa()
      .subscribe ( respuesta => { this.empresses = respuesta;
                                  // console.log("prrrrrrrrrrrrrrrrrrra");
                                  // console.log(this.empresses);
                                  /* this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);*/
                                },
                              error =>      { /*this.TrazaService.error("EMPRESSES NOM", "API GET EMPRESSES KO", error);*/ } 
      );
    }
  }

  

  openModalToAddMas($event){
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Càrrega massiva',
      lista: [],
      botonCerrar: "Tancar"  
    };
 
    // console.log(this.item);
    this.bsModalRefAdd = this.BsModalRefAdd.show(ModalToAddMasivoComponent, {initialState});
    
    // Pass in data directly content atribute after show
    this.bsModalRefAdd.content.isUser = this.isUser;

    // Get out
    this.bsModalRefAdd.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYESMas();                                
                              else  
                                this.actionPutNOMas();                                
      })
  }

  actionPutYESMas(){
    // console.log(this.bsModalRefAdd.content.registres);
    let registres: any = this.bsModalRefAdd.content.registres;
    let familia: any = this.bsModalRefAdd.content.familia;
    this.evento_AfegirXLS.emit({registres, familia});
  }

  actionPutNOMas(){

  }
  
}
