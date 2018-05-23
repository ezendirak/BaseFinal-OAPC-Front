import { ButtonTaulaGestioPeriodesComponent } from './../button-taula-gestio-periodes/button-taula-gestio-periodes.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Periode } from '../../model/periode';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HttpParams } from '@angular/common/http';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { ModalToAddCalendarComponent } from '../modal-to-add-calendar/modal-to-add-calendar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-gestio-periodes',
  templateUrl: './form-gestio-periodes.component.html',
  styleUrls: ['./form-gestio-periodes.component.css']
})
export class FormGestioPeriodesComponent implements OnInit {

  @Input()  periodes: Periode[];
  
  @Output() evento_filtroGestioPeriode: EventEmitter<any> = new EventEmitter();
  @Output() evento_AfegirPeriodeFromXLS: EventEmitter<any> = new EventEmitter();
  
  Periode:  Periode;

  bsConfig: Object;  
  bsRangeValue: Date[];
  bsModalRef: BsModalRef;
  private literals = LiteralsRegistre;
  
  constructor(private modalService : BsModalService,
              private translate            : TranslateService) { 
                translate.setDefaultLang('cat');
              }

  

  ngOnInit() {
  }

  onclick($event){
    // console.log($event);
    // console.log(this.bsRangeValue);
    // console.log(JSON.parse(JSON.stringify(this.bsRangeValue[0])));
    // console.log(JSON.parse(JSON.stringify(this.bsRangeValue[1])));
    

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
    window.scrollTo({
      top: 480,
      behavior: "smooth"
    });
    this.evento_filtroGestioPeriode.emit(params);
  }


  openModalToAddCalendar($event) {
    
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Càrrega de calendari',
      lista: [],
      botonCerrar: "Tancar"  
    };

    this.bsModalRef = this.modalService.show(ModalToAddCalendarComponent, {initialState});
    
    // Pass in data directly content atribute after show
    
    // this.bsModalRef.content.datos_entrada = item;
    // this.bsModalRef.content.datos_salida = {'codi': null, 'tipusProductes': null, 'estat': null};
    
    
    this.bsModalRef.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYES();                                
                              else  
                                this.actionPutNO();                                
      })
  }

  actionPutYES(){
    console.log("ACTION PUT YES")
    
    console.log(this.bsModalRef.content.periodesNous);
    // console.log(this.bsModalRef.content.datos_salida);

    // this.evento_AddNewEmpressa.emit(this.bsModalRef.content.datos_salida);
    // this.actionToEdit(this.productEdit);
    this.savePeriodeFromExcel(this.bsModalRef.content.periodesNous);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    console.log("ACTION NO PUT")
    // console.log(this.bsModalRef.content.datos_salida);
  }

  savePeriodeFromExcel(periodesNous:    Periode[]){
    this.evento_AfegirPeriodeFromXLS.emit(periodesNous);
  }
}
