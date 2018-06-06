import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../model/pagination';
import { AuthorizationService } from '../../services/authorization.service';
import { TrazaService } from '../../services/traza.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap';
import { GestioRegisterService } from '../../services/gestio-register.service';
import { InfoGestioReg } from '../../model/info-gestio-reg';
import { Periode } from '../../model/periode';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { InfoKey } from '../../interfaces/info-key';
import { RegisterService } from '../../services/register.service';
import { EmpressaService } from '../../services/empressa.service';

@Component({
  selector: 'app-gestio-register',
  templateUrl: './gestio-register.component.html',
  styleUrls: ['./gestio-register.component.css']
})
export class GestioRegisterComponent implements OnInit {

  pagination: Pagination;
  paginacio: number;

  filtroFake: any;
  filtre: any;

  items:    InfoGestioReg[];
  item:     InfoGestioReg;

  periodes:   Periode[];
  productesModal:     InfoKey[];

  productes:          InfoKey[];
  empresses:          String[];
  literal: LiteralsRegistre;
  constructor(private AuthorizationService: AuthorizationService, 
              private GestioRegisterService     : GestioRegisterService, 
              private TrazaService        : TrazaService,
              private modalService        : BsModalService,
              private translate            : TranslateService,
              private RegisterService       :RegisterService,
              private EmpressaService       :EmpressaService) { }

  ngOnInit() {

    this.getPeriodes();
    this.getProductes();
    this.getEmpresses();
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
    this.getRegistresPage("");
  }



  

getPeriodes()
  {
    if (this.AuthorizationService.is_logged()){
      this.GestioRegisterService.getPeriodes()
      .subscribe ( respuesta => { this.periodes = respuesta;

                                  //  this.TrazaService.dato("Periodes DISPONIBLES", "API GET PERIODES OK", this.periodes);
                                },
                  error =>      { /*this.TrazaService.error("Periodes DISPONIBLES", "API GET PERIODES KO", error);*/ } 
      );
    }
  }
  

  getPeriodesByProd(subGrup: String){
    if (this.AuthorizationService.is_logged()){
      this.GestioRegisterService.getPeriodesByProd(subGrup)
      .subscribe ( respuesta => { this.periodes = respuesta;

                                  //  this.TrazaService.dato("Periodes per producte", "API GET PERIODES OK", this.periodes);
                                },
                  error =>      { /*this.TrazaService.error("Periodes per producte", "API GET PERIODES KO", error);*/ } 
      );
    }
  }


  getProductesModal()
  {
    if (this.AuthorizationService.is_logged()){
      this.GestioRegisterService.getProductesModal()
      .subscribe ( respuesta => { this.productesModal = respuesta;
                                  // this.TrazaService.dato("Productes MODAL", "API GET Registres OK", this.productes);
                                },
                  error =>      { /*this.TrazaService.error("Productes MODAL", "API GET Registres KO", error);*/ } 
      );
    }
  }


  getProductes()
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getProductes()
      .subscribe ( respuesta => { this.productes = respuesta;
                                  // console.log("prrrrrrrrrrrrrrrrrrra");
                                  // console.log(this.productes);
                                  // this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);
                                },
                  error =>      { /*this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error);*/ } 
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
                  error =>      { /*this.TrazaService.error("EMPRESSES NOM", "API GET EMPRESSES KO", error);*/ } 
      );
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// FROM EVENTS //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

  OnClickSearch($event){
    // console.log("controller: onClickBuscarForm " + $event);
    this.pagination.page_actual = 1;
    this.filtre = $event;
    this.getRegistresPage($event); 
  }

  closePeriode(productes: String[]){
    if (this.AuthorizationService.is_logged()){
      // console.log("a la funcio del controlador: ");
      // console.log(productes);
      // console.log("abans del service: " + filtro.tipusProducte);
      this.GestioRegisterService.closePeriodeByProduct(productes)
      .subscribe ( respuesta => { //this.item = respuesta;

                                  /*this.TrazaService.dato("Registres", "API GET Registres OK", this.items);*/
                                  this.getRegistresPage(this.filtroFake);
                                },
                  error =>      { /*this.TrazaService.error("Registres", "API GET Registres KO", error);*/ } 
      );
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////PAGINATION//////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////

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


  getRegistresPage(filtro: any)
  {    
    if (this.AuthorizationService.is_logged())
    {
      this.getRegistresProdEmpPerCountFiltrat(filtro);
      this.GestioRegisterService.getRegistresProdEmpPerPage(this.pagination.page_actual, this.pagination.page_items, filtro)
      .subscribe ( respuesta => { this.items = respuesta;  
                                  this.pagination.page_actual_items = this.items.length;

                                  /*console.log(this.items);

                                  this.TrazaService.dato("REGISTRES", "API GETREGISTRESPAGE OK(" + this.pagination.page_actual + ")",this.items.length); */
                                },
                  error =>      { /*this.TrazaService.error("REGISTRES", "API GETREGISTRESPAGE KO", error);*/ } 
      );
    }
  }

  getRegistresProdEmpPerCountFiltrat(filtro: any)
  {
    if (this.AuthorizationService.is_logged()){
      this.GestioRegisterService.getRegistresProdEmpPerCountFiltrat(filtro)
      .subscribe ( respuesta => { this.pagination.total_items = respuesta;

                                  this.refreshPaginationCounters();
                                  this.refreshPaginationList();

                                  // this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.items);                                    
                                },
                  error =>      { /*this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error);*/ } 
      );
    }
  }

  onClickPutPEP($event){
    // console.log($event);
    this.putPep($event);
  }

  putPep(objPep: InfoGestioReg)
  { 
    if (this.AuthorizationService.is_logged()){
      // console.log(objPep);
      this.GestioRegisterService.putPep(objPep)
      .subscribe ( respuesta => { //this.item = respuesta;

                                 /* this.TrazaService.dato("Pep Update", "API GET Update Pep OK", this.items);*/
                                  // this.getProductes();
                                  // this.getRegistresPage(this.filtroFake);
                                },
                              error =>      { /*this.TrazaService.error("Pep Update", "API GET Update Pep KO", error);*/ } 
      );
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

}
