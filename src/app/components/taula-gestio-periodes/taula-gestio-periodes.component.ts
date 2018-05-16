import { DraggableItemService } from 'ngx-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Periode } from '../../model/periode';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LiteralsRegistre } from '../../literals-registre.enum';

@Component({
  selector: 'app-taula-gestio-periodes',
  templateUrl: './taula-gestio-periodes.component.html',
  styleUrls: ['./taula-gestio-periodes.component.css']
})
export class TaulaGestioPeriodesComponent implements OnInit {

  @Input()  items:  Periode[];
  
  private literals = LiteralsRegistre;
  
  constructor() { }

  ngOnInit() {
  }

}
