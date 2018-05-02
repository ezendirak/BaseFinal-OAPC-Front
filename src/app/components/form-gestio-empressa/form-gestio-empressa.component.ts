import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { InfoEmpressa } from '../../interfaces/info-empressa';
import { InfoKey } from '../../interfaces/info-key';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-form-gestio-empressa',
  templateUrl: './form-gestio-empressa.component.html',
  styleUrls: ['./form-gestio-empressa.component.css']
})
export class FormGestioEmpressaComponent implements OnInit {

  @Input() items      :InfoEmpressa;
  @Input() empresses  :String[];
  @Input() productes  :InfoKey[];

  @Output() evento_filtroGestioEmpressa:  EventEmitter<any> = new EventEmitter();

  selectedEmpressa  :string;
  selectedProducte  :InfoKey;
  estat             :string;
  constructor() { }

  ngOnInit() {
  }

  onclick(){
    let params = new HttpParams();
    if(this.selectedEmpressa && this.selectedEmpressa != 'Totes'){
      params = params.set('codiEmpressa', this.selectedEmpressa);
    }
    if(this.selectedProducte && this.selectedProducte.nom != 'Tots'){
      params = params.set('tipusProducte', this.selectedProducte.nom);
    }
    if(this.estat){
      params = params.set('estat', this.estat);
    }

    console.log(params);
    this.evento_filtroGestioEmpressa.emit(params);
  }
  
}
