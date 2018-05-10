import { DraggableItemService } from 'ngx-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Periode } from '../../model/periode';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-taula-gestio-periodes',
  templateUrl: './taula-gestio-periodes.component.html',
  styleUrls: ['./taula-gestio-periodes.component.css']
})
export class TaulaGestioPeriodesComponent implements OnInit {

  @Input()  items:  Periode[];
  
  constructor() { }

  ngOnInit() {
  }

}
