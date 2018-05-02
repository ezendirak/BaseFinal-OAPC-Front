import { InfoGestioProd } from './../../interfaces/info-gestio-prod';
import { InfoKey } from './../../interfaces/info-key';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { AuthorizationService } from '../../services/authorization.service';
import { RegisterService } from '../../services/register.service';
import { TrazaService } from '../../services/traza.service';
import { GestionsService } from '../../services/gestions.service';
import { AtributsComboMap } from '../../interfaces/atributs-combo-map';
import { Pagination } from '../../model/pagination';

@Component({
  selector: 'app-gestio-productes',
  templateUrl: './gestio-productes.component.html',
  styleUrls: ['./gestio-productes.component.css']
})
export class GestioProductesComponent implements OnInit {
  
  productes:        InfoKey[];
  families:         InfoKey[];

  pagination: Pagination;
  paginacio: number;

  productesModal:     InfoKey[];

  item:   InfoGestioProd;
  items:  InfoGestioProd[];

  filtroFake: any;
  filtre: any;

  regisProd: InfoGestioProd[];
  
  literal: LiteralsRegistre;
  constructor(private AuthorizationService: AuthorizationService,
              private GestionsService:      GestionsService,
              private TrazaService:         TrazaService,
              private RegisterService:      RegisterService, 
              private translate            : TranslateService) { }

  ngOnInit() {
    this.getProductes();
    this.getFamilies();
    // this.getTaulaProd();
    this.getProductesModal();
    this.filtroFake = "";
    this.paginacio = 5;

    this.pagination = new Pagination;
    this.pagination.page_actual = 1;
    this.pagination.page_max    = 0;
    this.pagination.total_items = 0;
    this.pagination.page_list   = [];
    // CONFIGURABLE
    this.pagination.page_items  = this.paginacio;   
    
    this.getRegistresPage(this.filtroFake);  
  }






  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// SERVICES ////////////////////////////////////////////////

  getProductes()
  {
    if (this.AuthorizationService.is_logged())
      this.GestionsService.getProductes()
      .subscribe ( respuesta => { this.productes = respuesta;
                                  // console.log("prrrrrrrrrrrrrrrrrrra");
                                  // console.log(this.productes);
                                  // this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
  }

  getFamilies()
  {
    if (this.AuthorizationService.is_logged())
      this.GestionsService.getFamilies()
      .subscribe ( respuesta => { this.families = respuesta;
                                  // console.log("prrrrrrrrrrrrrrrrrrra");
                                  // console.log(this.productes);
                                  // this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Families CLAU + NOM", "API GET Registres KO", error); } 
      );
  }

  getTaulaProd() {
    if (this.AuthorizationService.is_logged()){
      this.GestionsService.getTaulaProd()
      .subscribe ( respuesta => { this.regisProd = respuesta;
                                  // this.comboInfoModal = this.comboGeneral['PR01'];
                                  // this.TrazaService.dato("Combo GENERALS", "API GET COMBOGENERALS OK", this.items);
                                  console.log("Registres de Productes generats: ");
                                  console.log(this.regisProd);
                                  // console.log(this.comboGeneral["PR01"].Calibres);
                                },
                  error =>      { this.TrazaService.error("Combo GENERALS", "API GET COMBOGENERALS KO", error); } 
      ); 
    }
  }


  getRegistresPage(filtro: any)
  {    
    if (this.AuthorizationService.is_logged())
    {    
      // this.getRegistresCount(filtro);
      // console.log("abans del service "+filtro);
      this.getRegistresCountFiltrat(filtro);
      console.log("Filtre al pare: ");
      console.log(filtro);
      this.GestionsService.getRegistresPage(this.pagination.page_actual, this.pagination.page_items, filtro)
      .subscribe ( respuesta => { //this.items = respuesta;
                                  this.regisProd = respuesta;  
                                  this.pagination.page_actual_items = this.regisProd.length;

                                  this.TrazaService.dato("TAULA PROD", "API TAULA PROD OK(" + this.pagination.page_actual + ")",this.regisProd.length); 
                                },
                  error =>      { this.TrazaService.error("TAULA PROD", "API TAULA PROD KO", error); } 
      );
    }
  }

  getRegistresCountFiltrat(filtro: any)
  {
    if (this.AuthorizationService.is_logged())
      this.GestionsService.getRegistresCountFiltrat(filtro)
      .subscribe ( respuesta => { this.pagination.total_items = respuesta;

                                  this.refreshPaginationCounters();
                                  this.refreshPaginationList();

                                  // this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.items);                                    
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error); } 
      );
  }

  putRegistreToService(registre: InfoGestioProd)
  { 
    if (this.AuthorizationService.is_logged()){
      console.log(registre);
      this.GestionsService.putRegistre(registre)
      .subscribe ( respuesta => { this.item = respuesta;

                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                  this.getProductes();
                                  this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
    }
  }

  getProductesModal()
  {
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getProductesModal()
      .subscribe ( respuesta => { this.productesModal = respuesta;

                                  // this.TrazaService.dato("Productes MODAL", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes MODAL", "API GET Registres KO", error); } 
      );
  }
  
//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// FROM EVENTS //////////////////////////////////////////////

  onClickBuscarForm($event){
    console.log("controller: onClickBuscarForm " + $event);
    this.pagination.page_actual = 1;
    this.filtre = $event;
    console.log(this.filtre);

    this.getRegistresPage($event);
  }

  putRegistre($event){
    console.log("********************* controller: onClickPutList *******************"); 
    console.log($event);
    this.putRegistreToService($event);
  }


  onClickAddAtribut(newProd:  any)
  {
    if (this.AuthorizationService.is_logged()){
      console.log("a la funcio del controlador: ");
      console.log(newProd);
      // console.log("abans del service: " + filtro.tipusProducte);
      this.GestionsService.postNewAtribut(newProd)
      .subscribe ( respuesta => { //this.item = respuesta;

                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                  this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// PAGINATION //////////////////////////////////////////////////
  
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

  onClickNewPagination($event){
    console.log("Desde Registre: "+$event);
    this.pagination.page_items = $event;
    console.log(this.pagination);
    if (this.filtre){
      // console.log(this.filtre);
      this.getRegistresPage(this.filtre); 
    }else{
      this.getRegistresPage(""); 
    }
  }

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

  //////////////////////////////////////////////////////////////////////////////////////////////

}
