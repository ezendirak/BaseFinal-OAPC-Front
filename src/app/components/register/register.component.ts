import { MyUser } from './../../interfaces/my-user';
import { HomeComponent } from './../home/home.component';
import { HttpParams } from '@angular/common/http';
import { LiteralsRegistre } from './../../literals-registre.enum';
import { InfoKey } from './../../interfaces/info-key';
import { RegisterResponse } from './../../interfaces/register-response';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AtributsComboMap } from './../../interfaces/atributs-combo-map';
import { Component, OnInit, Input, OnChanges, SimpleChange }    from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';
import { NotesService }         from '../../services/notes.service';
import { TrazaService }         from '../../services/traza.service';

import { BsModalService }       from 'ngx-bootstrap';

import { Pagination }           from '../../model/pagination';
import { RegisterService } from '../../services/register.service';
import { AtributsComboResponse } from '../../interfaces/atributs-combo-response';
import { TranslateService } from '@ngx-translate/core';
import { Register } from '../../model/register';
import { Periode } from '../../model/periode';
import { EmpressaService } from '../../services/empressa.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  filtroFake: any;
  
  pagination: Pagination;
  paginacio: number;
  
  items:      RegisterResponse[];
  item:       RegisterResponse;

  items2: Register[];

  productes:  InfoKey[];
  productesModal: InfoKey[];

  periodes: Periode[];

  comboGeneral: AtributsComboMap;
  comboGeneralNoms  : AtributsComboMap;

  comboInfo:    AtributsComboResponse;
  comboLleno:  Boolean;
  comboLlenoModal:  Boolean;

  isPinyol: Boolean;
  isLlavor: Boolean;

  empresses:  String[];

  registres:    RegisterResponse[];

  filtre: any;
  periodesModal:  Periode[];
  comboInfoModal: AtributsComboResponse;
  usersList:  String[];
  miusuario:  MyUser;
  literal: LiteralsRegistre;
  constructor( private AuthorizationService: AuthorizationService, 
               private RegisterService     : RegisterService, 
               private TrazaService        : TrazaService,
               private modalService        : BsModalService,
               private translate            : TranslateService,
               private EmpressaService      :EmpressaService,
              private HomeComponent         :HomeComponent) 
               
  { }

  ngOnInit() {    
    this.comboLleno = false;
    this.comboLlenoModal = false;
    this.filtroFake = "";
    this.miusuario            = JSON.parse(sessionStorage.getItem("USER"));
    if(this.miusuario.empresa.codi!= "Administració"){this.getProductesModal(this.miusuario.user);}else{this.getProductesModal("admin");}
    this.getAllCombos();
    this.getAllNamesCombos();
    this.getProductes();
    this.getPeriodes();
    this.getPeriodesModal(this.miusuario.user);
    // this.getEmpresses();

    
    this.paginacio = 10;

    this.pagination = new Pagination;
    this.pagination.page_actual = 1;
    this.pagination.page_max    = 0;
    this.pagination.total_items = 0;
    this.pagination.page_list   = [];
    // CONFIGURABLE
    this.pagination.page_items  = this.paginacio;   
    if(this.miusuario.empresa.codi=='Administració'){
      
      this.getRegistresPage(this.filtroFake);
    }else {
      let params = new HttpParams();
      params = params.set('eInformant', this.miusuario.empresa.codi);
      this.getRegistresPage(params); 
    }
    
    
    
    
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  onClickBuscarForm($event)
  {
    console.log("controller: onClickBuscarForm " + $event);
    this.pagination.page_actual = 1;
    this.filtre = $event;
    this.getRegistresPage($event);    
  }

  afegirForm($event)
  {
    this.postRegistre($event);
  }

  putRegistre($event)
  {
    // console.log($event);
    this.putRegistreToService($event);
  }

  printItems($event)
  {
    console.log("lets see");
    console.log($event);
    this.downloadToExcel($event);
  }

  onClickDeleteList(item)
  {
    this.deleteRegistre(item.id, true)    
  }

  onClickPagination($event)
  {
    if ($event > 0)
    {
      this.pagination.page_actual = $event;
      if (this.filtre){
        this.getRegistresPage(this.filtre); 
      }else{
        this.getRegistresPage(""); 
      }
    }
  }

  onClickParams($event)
  {
    if ($event.subGrup == "PI"){
      this.isPinyol = true;
      this.isLlavor = false;
      //Cridar nous periodes
      this.getPeriodesByProd($event.subGrup);
    }else if ($event.subGrup == "LL"){
      this.isPinyol = false;
      this.isLlavor = true;
      //Cridar nous periodes
      this.getPeriodesByProd($event.subGrup);
    } else {
      this.isPinyol = false;
      this.isLlavor = false;
      //Treiem tots els periodes ja que no hi ha cap producte fixat
      this.getPeriodes(); 
    }
    //En el cas de que seleccionem un producte, sino hem de treure tots els atributs diferents.
    //Controlar quan es seleccionen tots els productes
    this.getCombos($event.clau); 
  }
 
  onClickNewPagination($event){
    // console.log("Desde Registre: "+$event);
    this.pagination.page_items = $event;
    // console.log(this.pagination);
    if (this.filtre){
      // console.log(this.filtre);
      this.getRegistresPage(this.filtre); 
    }else{
      this.getRegistresPage(""); 
    }
  }

  onClickGetCombos($event){
   console.log("onclickgetcombosModal: " + $event);
    // console.log($event);
    this.getCombosModal($event);
  }

  onClickPostNoComPer($event)
  {
    console.log($event);
    this.putPerNoCom($event);
  }
 
  SaveFromExcel($event){
    console.log($event.newRegistre);
    console.log($event.familia);
    this.postRegistreFromExcel($event.newRegistre, $event.familia);
  }

  descarregarAXLS($event){
    console.log("Estem al pare");
    console.log($event);
    this.downloadToExcel($event);
  }

  onClickChangeEmp($event)
  {
    console.log($event);
    this.getUsersByEmp($event);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////  
  /////////////////////////////////////////////////////////////////////////////////////////////
 
  downloadToExcel(items: RegisterResponse[]){
    if (this.AuthorizationService.is_logged())
    
    this.RegisterService.getDownloadToExcel(items)
    .subscribe ( respuesta => { //this.items = respuesta;
                                this.TrazaService.dato("ToExcel", "API GET ToExcel OK", this.items);
                              },
                error =>      { this.TrazaService.error("ToExcel", "API GET ToExcel KO", error); } 
    );
  }

  getRegistres()
  {
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getRegistres()
      .subscribe ( respuesta => { this.items = respuesta;
                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
  }

  getUsersByEmp(params: HttpParams)
  {
    if (this.AuthorizationService.is_logged())
    {
      this.RegisterService.getUsersByEmp(params)
      .subscribe ( respuesta => { this.usersList = respuesta;  
                                  console.log(this.usersList);
                                  this.TrazaService.dato("USERS", "API USERS OK(",this.usersList); 
                                },
                  error =>      { this.TrazaService.error("USERS", "API USERS KO", error); } 
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  getRegistresPage(filtro: any)
  {    
    if (this.AuthorizationService.is_logged())
    {
      this.getRegistresCountFiltrat(filtro);
      this.RegisterService.getRegistresPage(this.pagination.page_actual, this.pagination.page_items, filtro)
      .subscribe ( respuesta => { this.items = respuesta;  
                                  this.pagination.page_actual_items = this.items.length;
                                  console.log(this.items);
                                  this.TrazaService.dato("REGISTRES", "API GETREGISTRESPAGE OK(" + this.pagination.page_actual + ")",this.items.length); 
                                },
                  error =>      { this.TrazaService.error("REGISTRES", "API GETREGISTRESPAGE KO", error); } 
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  
  getRegistresCountFiltrat(filtro: any)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getRegistresCountFiltrat(filtro)
      .subscribe ( respuesta => { this.pagination.total_items = respuesta;

                                  this.refreshPaginationCounters();
                                  this.refreshPaginationList();

                                  // this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.items);                                    
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error); } 
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  deleteRegistre(id: number, refresh?:boolean)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.deleteRegistre(id)
      .subscribe ( respuesta => { this.item = respuesta;

                                  if ((this.pagination.page_actual_items == 1) && (this.pagination.page_actual > 1))
                                    this.pagination.page_actual--;

                                  if(this.miusuario.empresa.codi=='Administració'){
                                    this.filtroFake = "";
                                    this.getRegistresPage(this.filtroFake);
                                  }else {
                                    let params = new HttpParams();
                                    params = params.set('eInformant', this.miusuario.empresa.codi);
                                    this.getRegistresPage(params); 
                                  }

                                  this.TrazaService.dato("NOTES", "API DELETE OK", this.item);                                  
                                },
                  error =>      { this.TrazaService.error("NOTES", "API DELETE KO", error); }     
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  getProductes()
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getProductes()
      .subscribe ( respuesta => { this.productes = respuesta;
                                  // console.log("prrrrrrrrrrrrrrrrrrra");
                                  // console.log(this.productes);
                                  // this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
    }
  }

  getProductesModal(userName:  string)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getProductesModalByUserName(userName)
      .subscribe ( respuesta => { this.productesModal = respuesta;

                                  // this.TrazaService.dato("Productes MODAL", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes MODAL", "API GET Registres KO", error); } 
      );
    }
  }
  
  getPeriodes()
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getPeriodes()
      .subscribe ( respuesta => { this.periodes = respuesta;

                                   this.TrazaService.dato("Periodes DISPONIBLES", "API GET PERIODES OK", this.periodes);
                                },
                  error =>      { this.TrazaService.error("Periodes DISPONIBLES", "API GET PERIODES KO", error); } 
      );
    }
  }
  
  getPeriodesModal(userName:  string)
  {
    console.log(userName);
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getPeriodesDisponibles(userName)
      .subscribe ( respuesta => { this.periodesModal = respuesta;
                                  console.log(this.periodesModal);
                                   this.TrazaService.dato("Periodes MODAL DISPONIBLES", "API GET PERIODES OK", this.periodesModal);
                                },
                  error =>      { this.TrazaService.error("Periodes MODAL DISPONIBLES", "API GET PERIODES KO", error); } 
      );
    }
  }

  getPeriodesByProd(subGrup: String){
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getPeriodesByProd(subGrup)
      .subscribe ( respuesta => { this.periodes = respuesta;

                                   this.TrazaService.dato("Periodes per producte", "API GET PERIODES OK", this.periodes);
                                },
                  error =>      { this.TrazaService.error("Periodes per producte", "API GET PERIODES KO", error); } 
      );
    }
  }

  getCombos(tipusProducte: String)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getCombos(tipusProducte)
      .subscribe ( respuesta => { this.comboInfo = respuesta;
                                  this.TrazaService.dato("Combos", "API GET Combo OK", this.comboInfo);
                                  this.comboLleno = true;
                                },
                  error =>      { this.TrazaService.error("Combos", "API GET Combo KO", error); } 
      );   
    }
  }

  getCombosModal(tipusProducte: String)
  {
    console.log("getcombosModal en pare: " + tipusProducte);
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getCombos(tipusProducte)
      .subscribe ( respuesta => { this.comboInfoModal = respuesta;
                                  this.TrazaService.dato("Combos", "API GET Combo OK", this.comboInfoModal);
                                  this.comboLlenoModal = true;
                                },
                  error =>      { this.TrazaService.error("Combos", "API GET Combo KO", error); } 
      );   
    }
  }

  postRegistre(filtro: RegisterResponse)
  { 
    if (this.AuthorizationService.is_logged()){
      console.log(filtro);
      console.log("abans del service: " + filtro.tipusProducte);
      this.RegisterService.postRegistre(filtro)
      .subscribe ( respuesta => { this.item = respuesta;

                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                  if(this.miusuario.empresa.codi=='Administració'){
                                    this.filtroFake = "";
                                    this.getRegistresPage(this.filtroFake);
                                  }else {
                                    let params = new HttpParams();
                                    params = params.set('eInformant', this.miusuario.empresa.codi);
                                    this.getRegistresPage(params); 
                                  }
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
    }

  }

  postRegistreFromExcel(filtro: any, familia: number)
  { 
    if (this.AuthorizationService.is_logged()){
      // console.log("a la funcio del controlador: " + filtro);
      // console.log("abans del service: " + filtro.tipusProducte);
      this.RegisterService.postRegistreFromExcel(filtro, familia)
      .subscribe ( respuesta => { this.item = respuesta;

                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                  this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
    }

  }

  putRegistreToService(registre: any)
  { 
    if (this.AuthorizationService.is_logged()){
      console.log(registre);
      this.RegisterService.putRegistre(registre)
      .subscribe ( respuesta => { //this.item = respuesta;
                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                  if(this.miusuario.empresa.codi=='Administració'){
                                    this.filtroFake = "";
                                    this.getRegistresPage(this.filtroFake);
                                  }else {
                                    let params = new HttpParams();
                                    params = params.set('eInformant', this.miusuario.empresa.codi);
                                    this.getRegistresPage(params); 
                                  }
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
    }
  }

  putPerNoCom(nouRegistre:  any)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.putPerNoCom(nouRegistre)
      .subscribe ( respuesta => { //this.item = respuesta;

                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                  // this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
    }
  }

  getAllCombos() {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getAllCombos()
      .subscribe ( respuesta => { this.comboGeneral = respuesta;
                                  // this.comboInfoModal = this.comboGeneral['PR01'];
                                  // this.TrazaService.dato("Combo GENERALS", "API GET COMBOGENERALS OK", this.items);
                                  // console.log(this.comboGeneral);
                                  // console.log(this.comboGeneral["PR01"].Calibres);
                                },
                  error =>      { this.TrazaService.error("Combo GENERALS", "API GET COMBOGENERALS KO", error); } 
      );
    }
  }

  getAllNamesCombos() {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getAllNamesCombos()
      .subscribe ( respuesta => { this.comboGeneralNoms = respuesta;
                                  // this.comboInfoModal = this.comboGeneral['PR01'];
                                  // this.TrazaService.dato("Combo GENERALS", "API GET COMBOGENERALS OK", this.items);
                                  console.log(this.comboGeneralNoms);
                                  // console.log(this.comboGeneral["PR01"].Calibres);
                                },
                  error =>      { this.TrazaService.error("Combo GENERALS NOMS", "API GET COMBOGENERALS KO", error); } 
      );
    }
  }

  getEmpresses()
  {
    if (this.AuthorizationService.is_logged()){
      this.EmpressaService.getEmpressa()
      .subscribe ( respuesta => { this.empresses = respuesta;
                                  // console.log("prrrrrrrrrrrrrrrrrrra");
                                  // console.log(this.productes);
                                  // this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("EMPRESSES NOM", "API GET EMPRESSES KO", error); } 
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  refreshPaginationCounters()
  {
    let parte_resto:  number;
    let parte_entera: number;

    parte_resto  = this.pagination.total_items % this.pagination.page_items;
    parte_entera = (this.pagination.total_items - parte_resto) / this.pagination.page_items;

    if (parte_resto == 0)
      this.pagination.page_max = parte_entera;
    else
      this.pagination.page_max = parte_entera + 1;

    if ((this.pagination.page_actual > this.pagination.page_max) && (this.pagination.page_actual > 1))
      this.pagination.page_actual--;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  refreshPaginationList() 
  {

    let list_first:             number[] = [];
    let list_middle:            number[] = [];
    let list_last:              number[] = [];

    let list_final1:            number[] = [];
    let list_final2:            number[] = [];
    let list_final3:            string[] = [];

    // CONFIGURABLE
    // number of elements of each group
    let max_first_group:        number   = 2;
    let max_middle_group_first: number   = 1;
    let max_middle_group_last:  number   = 1;
    let max_last_group:         number   = 2;

    let page_max:               number;
    let page_mid:               number;
    let compara1:               number;
    let compara2:               number;
    
    page_max = this.pagination.page_max;
    page_mid = this.pagination.page_actual;

    for (let i = 1; i <= page_max; i++)
      if (i <= max_first_group)
        list_first.push(i);

    for (let i = 1; i <= page_max; i++)
      if (i <= max_last_group)
        list_last.push(page_max - i + 1);

    for (let i = page_mid; i >= page_mid - max_middle_group_first; i--)
      if (i >= 1)
        list_middle.push(i);

    for (let i = page_mid; i <= page_mid + max_middle_group_last; i++)
      if (i <= page_max)
        list_middle.push(i);

    list_final1 = list_first;
    list_final1 = list_final1.concat(list_middle);
    list_final1 = list_final1.concat(list_last);

    list_final1 = list_final1.sort((n1, n2) => n1 - n2);

    for (let i = 0; i < list_final1.length; i++)
      if (list_final2.indexOf(list_final1[i]) < 0)
        list_final2.push(list_final1[i]);

    for (let i = 0; i < list_final2.length; i++) 
    {
      list_final3.push(list_final2[i].toString());

      if (i < list_final2.length - 1) 
      {
        compara1 = list_final2[i] + 1;
        compara2 = list_final2[i + 1];

        if (compara1 != compara2)
          list_final3.push("..");
      }
    }

    
    this.pagination.page_list = list_final3;
  }
  
}
