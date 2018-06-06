import { InfoKey } from './../../interfaces/info-key';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Periode } from '../../model/periode';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { TranslateService } from '@ngx-translate/core';
import { HttpParams } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalToClosePerComponent } from '../modal-to-close-per/modal-to-close-per.component';

@Component({
  selector: 'app-form-gestio-register',
  templateUrl: './form-gestio-register.component.html',
  styleUrls: ['./form-gestio-register.component.css']
})
export class FormGestioRegisterComponent implements OnInit {

  @Input()  periodes:           Periode[];
  @Input()  productes:          InfoKey[];
  @Input()  productesModal:      InfoKey[];
  @Input()  empresses:           String[];

  @Output() evento_Buscar:                EventEmitter<any> = new EventEmitter();
  @Output() evento_actionToClosePeriode:  EventEmitter<any> = new EventEmitter();

  periodeSelected       :Periode;
  producteSelected      :InfoKey;
  empressaSelected       :string;
  estatSelected          :string;

  bsModalRefClose: BsModalRef;

  private literals = LiteralsRegistre;
  constructor(private translate            : TranslateService,
              private bsModalRef: BsModalService) { 
                translate.setDefaultLang('cat');
              }

  ngOnInit() {
    // console.log(this.productes);
  }

  onclick($event){
    console.log(this.periodeSelected,this.producteSelected,this.empressaSelected,this.estatSelected);

    let params = new HttpParams();
     if(this.periodeSelected && this.periodeSelected.tipusPeriode != 'Tots'){
      
      params = params.set('periode', this.periodeSelected.numPeriode + this.periodeSelected.tipusPeriode);
     }
     if(this.producteSelected && this.producteSelected.nom != 'Tots'){
      params = params.set('tipusProducte', this.producteSelected.nom);
     }
    // params = params.set('tipusProducte', this.selectedTipusProducte).set('colorCarn', this.selectedColorCarn).set('qualitat', this.selectedQualitat).set('calibre', this.selectedKalibre);
     if (this.empressaSelected && this.empressaSelected != 'Totes'){
        params = params.set('empresa', this.empressaSelected);
     }
     if (this.estatSelected && this.estatSelected != 'Tots'){
        params = params.set('estat', this.estatSelected);
     }
     
      //  this.evento_form1.emit(JSON.stringify(this.filtros));
      // console.log(params);
      window.scrollTo({
        top: 480,
        behavior: "smooth"
      });
    this.evento_Buscar.emit(params);
  }

  openModalToClose($event){

   // Pass in data directly before show method
    const initialState = {
      titulo: 'Tancament de Periodes',
      lista: [],
      botonCerrar: "Tancar"  
    };

    // console.log(this.item);
    this.bsModalRefClose = this.bsModalRef.show(ModalToClosePerComponent, {initialState});

    // Pass in data directly content atribute after show
    // this.bsModalRefAdd.content.datos_salida = {id : null, clau : null, nom : null, subGrup: null};
    this.bsModalRefClose.content.dadesSortida = {productes : null};
    this.bsModalRefClose.content.productes = this.productesModal; //no cal, ara mateix utilitzo una variable nomes d'Strings
    // this.bsModalRefAdd.content.comboInfoModal = this.comboInfoModal;
    // this.bsModalRefAdd.content.productesModal = this.productesModal;

    // this.bsModalRefAdd.content.periodesModal = this.periodesModal;

    // Get out
    this.bsModalRefClose.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYES();                                
                              else  
                                this.actionPutNO();                                
      })
  }

  actionPutYES(){
    // console.log("ACTION PUT YES")
    this.evento_actionToClosePeriode.emit(this.bsModalRefClose.content.productesSelected);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    // console.log("ACTION NO PUT")
    // console.log(this.bsModalRefClose.content.datos_salida);
  }

}
