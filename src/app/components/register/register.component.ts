import { RegisterResponse } from './../../interfaces/register-response';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AtributsComboMap } from './../../interfaces/atributs-combo-map';
import { Component, OnInit, Input }    from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';
import { NotesService }         from '../../services/notes.service';
import { TrazaService }         from '../../services/traza.service';

import { BsModalService }       from 'ngx-bootstrap';

import { Pagination }           from '../../model/pagination';
import { RegisterService } from '../../services/register.service';
import { AtributsComboResponse } from '../../interfaces/atributs-combo-response';
import { TranslateService } from '@ngx-translate/core';
import { empty } from 'rxjs/observable/empty';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 

  filtroFake: any;

  pagination: Pagination;

  items:      RegisterResponse[];
  item:       RegisterResponse;

  productes:  String[];
  productesModal: String[];

  comboGeneral: AtributsComboMap;

  comboInfo:    AtributsComboResponse;
  comboLleno:  Boolean;
  comboLlenoModal:  Boolean;

  registres:    RegisterResponse[];

  filtre: any;

  comboInfoModal: AtributsComboResponse;

  constructor( private AuthorizationService: AuthorizationService, 
               private RegisterService     : RegisterService, 
               private TrazaService        : TrazaService,
               private modalService        : BsModalService,
               private translate            : TranslateService) 
               
  { }

  ngOnInit() {    
    
    this.comboLleno = false;
    this.comboLlenoModal = false;
    this.getProductesModal();
    this.getAllCombos();
    this.getProductes();
    
    this.filtroFake = "";
    
    this.pagination = new Pagination;
    this.pagination.page_actual = 1;
    this.pagination.page_max    = 0;
    this.pagination.total_items = 0;
    this.pagination.page_list   = [];
    // CONFIGURABLE
    this.pagination.page_items  = 2;   
    
    this.getRegistresPage(this.filtroFake);   
  }

  
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  onClickBuscarForm($event)
  {
    console.log("controller: onClickBuscarForm " + $event);
    this.pagination.page_actual = 1;
    this.filtre = $event;
    console.log(this.filtre);
    // if (!this.filtre){
    //   this.filtre = "";
    // }
    this.getRegistresPage($event);    
    // this.getResultatFiltrat($event);
  }

  afegirForm($event)
  {
    // console.log("Controlador Pare: " + $event);
    // console.log("Controlador Pare 2: " + this.item);
    console.log($event);
    this.postRegistre($event);
    
  }

  putRegistre($event)
  {
    console.log("********************* controller: onClickPutList *******************"); 
    console.log($event);
    this.putRegistreToService($event);
  }

  onClickDeleteList(item)
  {
    console.log("controller: onClickDeleteList ");
    console.log("Controlador: " + item.id);

    this.deleteRegistre(item.id, true)    
  }

  onClickPagination($event)
  {
    if ($event > 0)
    {
      // console.log("controller: onClickPagination " + $event);    

      this.pagination.page_actual = $event;
      // this.getRegistresPage($event);
      if (this.filtre){
        // console.log(this.filtre);
        this.getRegistresPage(this.filtre); 
      }else{
        this.getRegistresPage(""); 
      }
      
    }
  }

  onClickParams($event)
  {
    // console.log("controller: onClickParams " + $event);
    this.getCombos($event);
  }

  onClickGetCombos($event){
    // console.log("onclickgetcombosModal: " + $event);
    // console.log($event);
    this.getCombosModal($event);
  }

  actionToEdit($event){
    console.log("tanquem el modal per editar!");
    console.log($event);
  }
  // switchLanguage(language: string){
  //   console.log("Desde el pare: " + this.language);
  //   this.translate.use(this.language);
  // }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////  
  /////////////////////////////////////////////////////////////////////////////////////////////
 
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

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  getRegistresPage(filtro: any)
  {    
    if (this.AuthorizationService.is_logged())
    {    
      // this.getRegistresCount(filtro);
      console.log("abans del service "+filtro);
      this.getRegistresCountFiltrat(filtro);
      this.RegisterService.getRegistresPage(this.pagination.page_actual, this.pagination.page_items, filtro)
      .subscribe ( respuesta => { this.items = respuesta;  
                                  this.pagination.page_actual_items = this.items.length;

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
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getRegistresCountFiltrat(filtro)
      .subscribe ( respuesta => { this.pagination.total_items = respuesta;

                                  this.refreshPaginationCounters();
                                  this.refreshPaginationList();

                                  this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.items);                                    
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error); } 
      );
  }

  getRegistresCount()
  {
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getRegistresCount()
      .subscribe ( respuesta => { this.pagination.total_items = respuesta;

                                  this.refreshPaginationCounters();
                                  this.refreshPaginationList();

                                  this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.items);                                    
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error); } 
      );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  deleteRegistre(id: number, refresh?:boolean)
  {
    if (this.AuthorizationService.is_logged())
      this.RegisterService.deleteRegistre(id)
      .subscribe ( respuesta => { this.item = respuesta;

                                  if ((this.pagination.page_actual_items == 1) && (this.pagination.page_actual > 1))
                                    this.pagination.page_actual--;

                                  this.getRegistresPage(this.filtroFake);

                                  this.TrazaService.dato("NOTES", "API DELETE OK", this.item);                                  
                                },
                  error =>      { this.TrazaService.error("NOTES", "API DELETE KO", error); }     
      );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  getProductes()
  {
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getProductes()
      .subscribe ( respuesta => { this.productes = respuesta;

                                  this.TrazaService.dato("Productes", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes", "API GET Registres KO", error); } 
      );
  }

  getProductesModal()
  {
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getProductesModal()
      .subscribe ( respuesta => { this.productesModal = respuesta;

                                  this.TrazaService.dato("Productes MODAL", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes MODAL", "API GET Registres KO", error); } 
      );
  }
  
  getCombos(tipusProducte: String)
  {
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getCombos(tipusProducte)
      .subscribe ( respuesta => { this.comboInfo = respuesta;
                                  this.TrazaService.dato("Combos", "API GET Combo OK", this.comboInfo);
                                  this.comboLleno = true;
                                },
                  error =>      { this.TrazaService.error("Combos", "API GET Combo KO", error); } 
      );   
  }

  getCombosModal(tipusProducte: String)
  {
    console.log("getcombosModal en pare: " + tipusProducte);
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getCombos(tipusProducte)
      .subscribe ( respuesta => { this.comboInfoModal = respuesta;
                                  this.TrazaService.dato("Combos", "API GET Combo OK", this.comboInfoModal);
                                  this.comboLlenoModal = true;
                                },
                  error =>      { this.TrazaService.error("Combos", "API GET Combo KO", error); } 
      );   
  }


  
  getResultatFiltrat(filtro: any)
  {
    if (this.AuthorizationService.is_logged())
    console.log("a la funcio del controlador: " + filtro);
      this.RegisterService.getResultatFiltrat(filtro)
      .subscribe ( respuesta => { this.items = respuesta;

                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
  }



  postRegistre(filtro: any)
  { 
    if (this.AuthorizationService.is_logged()){
      console.log("a la funcio del controlador: " + filtro);
      console.log("abans del service: " + filtro.tipusProducte);
      this.RegisterService.postRegistre(filtro)
      .subscribe ( respuesta => { this.item = respuesta;

                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                  this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
    }

  }

  putRegistreToService(registre: RegisterResponse)
  { 
    if (this.AuthorizationService.is_logged()){
      console.log(registre);
      this.RegisterService.putRegistre(registre)
      .subscribe ( respuesta => { this.item = respuesta;

                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                  this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
    }

  }

  getAllCombos() {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getAllCombos()
      .subscribe ( respuesta => { this.comboGeneral = respuesta;

                                  this.TrazaService.dato("Combo GENERALS", "API GET COMBOGENERALS OK", this.items);
                                  console.log(this.comboGeneral);
                                  console.log(this.comboGeneral["PR01"].Calibres);
                                },
                  error =>      { this.TrazaService.error("Combo GENERALS", "API GET COMBOGENERALS KO", error); } 
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
