import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ipagination } from '../../interfaces/ipagination';

@Component({
  selector: 'app-button-taula-gestio-periodes',
  templateUrl: './button-taula-gestio-periodes.component.html',
  styleUrls: ['./button-taula-gestio-periodes.component.css']
})
export class ButtonTaulaGestioPeriodesComponent implements OnInit {

  @Input() pagination:              Ipagination;
  @Input() paginacio:               number;

  @Output() evento_list_pagination: EventEmitter<any> = new EventEmitter();
  @Output() evento_new_pagination: EventEmitter<any> = new EventEmitter();

  constructor() { }

  selectedPagination: number;

  valors: number[];
  ngOnInit() {
    this.valors = [5, 10, 15, 20];
    this.selectedPagination = 10;
  }

  actionPagination($event)
  {
    console.log("*****************************************")
    console.log($event);
    this.evento_list_pagination.emit($event);
  }

  changeSelectedPagination($event){
    console.log("CanviPagination: " + this.selectedPagination);
    this.evento_new_pagination.emit(this.selectedPagination);
  }
}
