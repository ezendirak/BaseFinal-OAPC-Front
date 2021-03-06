import { EmpressaService } from './../../services/empressa.service';
import { InfoEmpressa } from './../../interfaces/info-empressa';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../model/pagination';
import { AuthorizationService } from '../../services/authorization.service';
import { TrazaService } from '../../services/traza.service';
import { TranslateService } from '@ngx-translate/core';
import { InfoKey } from '../../interfaces/info-key';
import { InfoKeyClass } from '../../model/info-key-class';
import { GestionsService } from '../../services/gestions.service';
import { Estats } from '../../model/estats';

@Component({
  selector: 'app-gestio-empressa',
  templateUrl: './gestio-empressa.component.html',
  styleUrls: ['./gestio-empressa.component.css']
})
export class GestioEmpressaComponent implements OnInit {
  
  paginacio:  number;
  pagination: Pagination;
  
  empresses: String[];

  productes:  InfoKey[];
  productesModal  :InfoKeyClass[] = new Array<InfoKeyClass>();

  filtroFake: any;
  filtre:     any;

  items:      InfoEmpressa[];
  item:       InfoEmpressa;
  estat:        Estats;
  estats:       Estats[];
  estatsModal:  Estats[];
  estatModal:     Estats;

  constructor(private AuthorizationService  :AuthorizationService, 
              private GestionsService:      GestionsService,
              private TrazaService          :TrazaService,
              private EmpressaService       :EmpressaService,
              // private modalService        : BsModalService,
              private translate             :TranslateService) { }

  ngOnInit() {
    
    
    // this.getProductes();
    this.getEmpresses();
    this.getProductes();
    this.getProductesModal();
    
    this.filtroFake = "";
    this.paginacio = 10;

    this.pagination = new Pagination;
    this.pagination.page_actual = 1;
    this.pagination.page_max    = 0;
    this.pagination.total_items = 0;
    this.pagination.page_list   = [];
    // CONFIGURABLE
    this.pagination.page_items  = this.paginacio;   
    
    this.getRegistresPage(this.filtroFake);  

    this.estat = new Estats();
    this.estats = new Array<Estats>();
    this.estatsModal = new Array<Estats>();
    this.estat.nom = "Tots";
    this.estat.valor = "2";
    this.estats.push(this.estat);

    this.estat = new Estats();
    this.estat.nom = "Actiu";
    this.estat.valor = "1";
    this.estats.push(this.estat);
    // this.estatsModal.push(this.estat);

    this.estat = new Estats();
    this.estat.nom = "Inactiu";
    this.estat.valor = "0";
    this.estats.push(this.estat);
    
    this.estat = new Estats();
    // this.estatsModal.push(this.estat);
/////////////////////////////////////////////
    this.estatModal = new Estats();
    this.estatModal.nom = "Actiu";
    this.estatModal.valor = "1";
    this.estatsModal.push(this.estatModal);

    this.estatModal = new Estats();
    this.estatModal.nom = "Inactiu";
    this.estatModal.valor = "0";
    this.estatsModal.push(this.estatModal);
    console.log(this.estatsModal);
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

  getProductes()
  {
    if (this.AuthorizationService.is_logged()){
      this.EmpressaService.getProductes()
      .subscribe ( respuesta => { this.productes = respuesta;
                                  console.log("prrrrrrrrrrrrrrrrrrra");
                                  console.log(this.productes);
                                  // this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
    }
  }

  getProductesModal()
  {
    if (this.AuthorizationService.is_logged()){
      this.EmpressaService.getProductesModal()
      .subscribe ( respuesta => { this.productesModal = respuesta;
                                  console.log("prrrrrrrrrrrrrrrrrrra");
                                  console.log(this.productesModal);
                                  // this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
    }
  }

  putEmpressa(registre: InfoEmpressa)
  { 
    if (this.AuthorizationService.is_logged()){
      console.log(registre);
      this.EmpressaService.putEmpressa(registre)
      .subscribe ( respuesta => { //this.item = respuesta;

                                  this.TrazaService.dato("PUT EMPRESSA", "API GET EMPRESSA OK", this.items);
                                  this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { this.TrazaService.error("PUT EMPRESSA", "API GET EMPRESSA KO", error); } 
      );
    }

  }

  deleteEmpressa(registre: InfoEmpressa)
  {
    if (this.AuthorizationService.is_logged()){
      console.log(registre);
      this.EmpressaService.deleteEmpressa(registre)
      .subscribe ( respuesta => { //this.item = respuesta;

                                  this.TrazaService.dato("DELETE EMPRESSA", "API DEL EMPRESSA OK", this.items);
                                  this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { this.TrazaService.error("DELETE EMPRESSA", "API DEL EMPRESSA KO", error); } 
      );
    }
  }

////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// FROM EVENTS ///////////////////////////////////////////

  onClickBuscarForm($event) {
    console.log("controller: onClickBuscarForm " + $event);
    this.pagination.page_actual = 1;
    this.filtre = $event;
    console.log(this.filtre);

    this.getRegistresPage($event);
  }

  onClickToEditEmp($event) {
    console.log($event);
    this.putEmpressa($event);
  }

  onClickToDeleteEmp($event)
  {
    console.log($event);
    this.deleteEmpressa($event);
  }

  onClickAddNewEmp(newEmp: InfoEmpressa) 
  {
    if (this.AuthorizationService.is_logged()){
      console.log("a la funcio del controlador: ");
      console.log(newEmp);
      // console.log("abans del service: " + filtro.tipusProducte);
      this.GestionsService.postNewEmp(newEmp)
      .subscribe ( respuesta => { //this.item = respuesta;

                                  this.TrazaService.dato("Registres", "API GET Registres OK", this.items);
                                  this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { this.TrazaService.error("Registres", "API GET Registres KO", error); } 
      );
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////// PAGINATION ////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////

  getRegistresPage(filtro: any)
  {    
    if (this.AuthorizationService.is_logged())
    {
      this.getRegistresCountFiltrat(filtro);
      this.EmpressaService.getRegistresPage(this.pagination.page_actual, this.pagination.page_items, filtro)
      .subscribe ( respuesta => { this.items = respuesta;  
                                  this.pagination.page_actual_items = this.items.length;
                                  console.log(this.items);
                                  this.TrazaService.dato("EMPRESSES", "API GETEMPRESSESPAGE OK(" + this.pagination.page_actual + ")",this.items.length); 
                                },
                  error =>      { this.TrazaService.error("EMPRESSES", "API GETEMPRESSESPAGE KO", error); } 
      );
    }
  }

  getRegistresCountFiltrat(filtro: any)
  {
    if (this.AuthorizationService.is_logged()){
        this.EmpressaService.getRegistresCountFiltrat(filtro)
      .subscribe ( respuesta => { this.pagination.total_items = respuesta;

                                  this.refreshPaginationCounters();
                                  this.refreshPaginationList();

                                  // this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.items);                                    
                                },
                  error =>      { this.TrazaService.error("EMPRESSES", "API GETEMPRESSESCOUNT KO", error); } 
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
