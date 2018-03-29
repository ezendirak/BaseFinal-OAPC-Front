import { Component, OnInit }    from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';
import { NotesService }         from '../../services/notes.service';
import { TrazaService }         from '../../services/traza.service';

import { BsModalService }       from 'ngx-bootstrap';

import { NotesResponse }        from '../../interfaces/notes-response';
import { Pagination }           from '../../model/pagination';

@Component({
  selector: 'app-notes2',
  templateUrl: './notes2.component.html',
  styleUrls: ['./notes2.component.css']
})
export class Notes2Component implements OnInit {

  pagination: Pagination;

  items:      NotesResponse[];
  item:       NotesResponse;

  constructor( private AuthorizationService: AuthorizationService, 
               private NotesService        : NotesService, 
               private TrazaService        : TrazaService,
               private modalService        : BsModalService ) 
  { }

  ngOnInit() {    

    this.pagination = new Pagination;
    
    this.pagination.page_actual = 1;
    this.pagination.page_max    = 0;
    this.pagination.total_items = 0;
    this.pagination.page_list   = [];

    // CONFIGURABLE
    this.pagination.page_items  = 3;      
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  onClickBuscarForm($event)
  {
    console.log("controller: onClickBuscarForm " + $event);
    console.log("Info en items: " + this.items);
    this.pagination.page_actual = 1;
    this.getNotesPage();    
  }

  onClickPutList($event)
  {
    console.log("controller: onClickPutList "); 
    console.log($event);
  }

  onClickDeleteList($event)
  {
    console.log("controller: onClickDeleteList ");
    console.log($event);

    this.deleteNote($event.id, true)    
  }

  onClickPagination($event)
  {
    if ($event > 0)
    {
      console.log("controller: onClickPagination " + $event);    

      this.pagination.page_actual = $event;
      this.getNotesPage();  
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////  
  /////////////////////////////////////////////////////////////////////////////////////////////

  getNotes()
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNotes()
      .subscribe ( respuesta => { this.items = respuesta;

                                  this.TrazaService.dato("NOTES", "API GETNOTES OK", this.items);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTES KO", error); } 
      );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  getNotesPage()
  {    
    if (this.AuthorizationService.is_logged())
    {    
      this.getNotesCount();

      this.NotesService.getNotesPage(this.pagination.page_actual, this.pagination.page_items)
      .subscribe ( respuesta => { this.items = respuesta;  

                                  this.pagination.page_actual_items = this.items.length;

                                  this.TrazaService.dato("NOTES", "API GETNOTESPAGE OK(" + this.pagination.page_actual + ")",this.items.length); 
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESPAGE KO", error); } 
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  getNotesCount()
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNotesCount()
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

  deleteNote(id: number, refresh?:boolean)
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.deleteNote(id)
      .subscribe ( respuesta => { this.item = respuesta;

                                  if ((this.pagination.page_actual_items == 1) && (this.pagination.page_actual > 1))
                                    this.pagination.page_actual--;

                                  this.getNotesPage();

                                  this.TrazaService.dato("NOTES", "API DELETE OK", this.item);                                  
                                },
                  error =>      { this.TrazaService.error("NOTES", "API DELETE KO", error); }     
      );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

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
