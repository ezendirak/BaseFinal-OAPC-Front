import { TrazaService } from './../../services/traza.service';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { RegisterService } from '../../services/register.service';
import { Periode } from '../../model/periode';
import { Pagination } from '../../model/pagination';
import { GestioPeriodesService } from '../../services/gestio-periodes.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-gestio-periodes',
  templateUrl: './gestio-periodes.component.html',
  styleUrls: ['./gestio-periodes.component.css']
})
export class GestioPeriodesComponent implements OnInit {
  
  pagination: Pagination;
  paginacio: number;
  periodes:   Periode[];

  items:      Periode[];
  filtroFake:   any;
  filtre:       any;

  constructor(private AuthorizationService:   AuthorizationService,
              private RegisterService:        RegisterService,
              private GestioPeriodesService:  GestioPeriodesService,
              private TrazaService:           TrazaService,
              private translate            : TranslateService) { }

  ngOnInit() {
    this.getPeriodes();

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
  }



  getPeriodes()
  {
    if (this.AuthorizationService.is_logged()) {
        this.RegisterService.getPeriodes()
      .subscribe ( respuesta => { this.periodes = respuesta;

                                  this.TrazaService.dato("Periodes DISPONIBLES", "API GET PERIODES OK", this.periodes);
                                },
                  error =>      { this.TrazaService.error("Periodes DISPONIBLES", "API GET PERIODES KO", error); } 
      );
    }
  }

  postNewPeriodes(periodesNous:   Periode[])
  {
    if (this.AuthorizationService.is_logged()){
      this.GestioPeriodesService.postNewPeriodes(periodesNous)
      .subscribe ( respuesta => { this.periodes = respuesta;

                                  this.TrazaService.dato("Periodes nous DISPONIBLES", "API GET PERIODES OK", this.periodes);
                                },
                  error =>      { this.TrazaService.error("Periodes nous DISPONIBLES", "API GET PERIODES KO", error); } 
      );
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////FROM EVENTS///////////////////////////////////////////////////

onClickToFilter($event)
{
console.log($event);
this.getRegistresPage($event);
}

onClickToAddPeriode($event)
{
  console.log($event);
  console.log("Cap a spring!");
  this.postNewPeriodes($event);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////PAGINATION////////////////////////////////////////////////////////

  getRegistresPage(filtro: any)
  {    
    if (this.AuthorizationService.is_logged())
    {
      this.getRegistresCountFiltrat(filtro);
      this.GestioPeriodesService.getRegistresPage(this.pagination.page_actual, this.pagination.page_items, filtro)
      .subscribe ( respuesta => { this.items = respuesta;  
                                  this.pagination.page_actual_items = this.items.length;
                                  
                                  
                                  this.TrazaService.dato("GESTIOPERIODE", "API GESTIOPERIODE OK(" + this.pagination.page_actual + ")",this.items.length); 
                                },
                  error =>      { this.TrazaService.error("GESTIOPERIODE", "API GESTIOPERIODE KO", error); } 
      );
    }
  }


  
  getRegistresCountFiltrat(filtro: any)
  {
    if (this.AuthorizationService.is_logged()){
      this.GestioPeriodesService.getRegistresCountFiltrat(filtro)
      .subscribe ( respuesta => { this.pagination.total_items = respuesta;

                                  this.refreshPaginationCounters();
                                  this.refreshPaginationList();

                                  // this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.items);                                    
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error); } 
      );
    }
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
