import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ipagination } from '../../interfaces/ipagination';

@Component({
  selector: 'app-button-taula-register',
  templateUrl: './button-taula-register.component.html',
  styleUrls: ['./button-taula-register.component.css']
})
export class ButtonTaulaRegisterComponent implements OnInit {

  @Input() pagination:              Ipagination;
  
  @Output() evento_list_pagination: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  actionPagination($event)
  {
    console.log("*****************************************")
    console.log($event);
    this.evento_list_pagination.emit($event);
  }
}
