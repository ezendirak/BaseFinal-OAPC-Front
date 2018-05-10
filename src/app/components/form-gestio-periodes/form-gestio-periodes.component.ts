import { ButtonTaulaGestioPeriodesComponent } from './../button-taula-gestio-periodes/button-taula-gestio-periodes.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Periode } from '../../model/periode';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-form-gestio-periodes',
  templateUrl: './form-gestio-periodes.component.html',
  styleUrls: ['./form-gestio-periodes.component.css']
})
export class FormGestioPeriodesComponent implements OnInit {

  @Input()  periodes: Periode[];
  
  @Output() evento_filtroGestioPeriode: EventEmitter<any> = new EventEmitter();
  
  Periode:  Periode;

  bsConfig: Object;  
  bsRangeValue: Date[];
  constructor() { }

  

  ngOnInit() {
  }

  onclick($event){
    console.log($event);
    console.log(this.bsRangeValue);
    console.log(JSON.parse(JSON.stringify(this.bsRangeValue[0])));
    console.log(JSON.parse(JSON.stringify(this.bsRangeValue[1])));
    

    let params = new HttpParams();
     if(this.Periode && this.Periode.tipusPeriode != 'Tots'){
      params = params.set('periode', this.Periode.numPeriode + this.Periode.tipusPeriode);
     }
     if(this.bsRangeValue){
      params = params.set('dataInici', this.bsRangeValue[0].toDateString());
      if (JSON.parse(JSON.stringify(this.bsRangeValue[0])) != JSON.parse(JSON.stringify(this.bsRangeValue[1]))){
        params = params.set('dataFi', this.bsRangeValue[1].toDateString());
      }
     }

    console.log(params);
    console.log(decodeURI(params.toString()));
    this.evento_filtroGestioPeriode.emit(params);
  }
}
