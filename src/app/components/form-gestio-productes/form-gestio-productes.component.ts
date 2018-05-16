import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { InfoKey } from '../../interfaces/info-key';
import { HttpParams } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalToAddProdComponent } from '../modal-to-add-prod/modal-to-add-prod.component';

@Component({
  selector: 'app-form-gestio-productes',
  templateUrl: './form-gestio-productes.component.html',
  styleUrls: ['./form-gestio-productes.component.css']
})
export class FormGestioProductesComponent implements OnInit {
  
  @Input() productes:       InfoKey[];
  @Input() families:        InfoKey[];
  @Input() productesModal:  InfoKey[];

  @Output() evento_filtroGestioProd: EventEmitter<any> = new EventEmitter();
  @Output() evento_actionToAddAtribut:  EventEmitter<any> = new EventEmitter();

  // @Output() evento_form1: EventEmitter<any> = new EventEmitter();
  selectedTipusProducte:  InfoKey;
  selectedFamilia:  InfoKey;

  bsModalRefAdd: BsModalRef;
  
  private literals = LiteralsRegistre;
  constructor(private traductorService: TranslateService,
              private BsModalRefAdd: BsModalService) { }

  ngOnInit() {

  }

  onclick(){
    let params = new HttpParams();
     if(this.selectedTipusProducte && this.selectedTipusProducte.nom != 'Tots'){
      params = params.set('tipusProducte', this.selectedTipusProducte.nom);
     }
     if(this.selectedFamilia && this.selectedFamilia.nom != 'Totes'){
      params = params.set('familia', this.selectedFamilia.subGrup);
     }

    console.log(params);
    window.scrollTo(0, 320);
    this.evento_filtroGestioProd.emit(params);
  }

  openModalToAddProd($event){
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Afegir nou atribut',
      lista: [],
      botonCerrar: "Tancar"  
    };

    // console.log(this.item);
    this.bsModalRefAdd = this.BsModalRefAdd.show(ModalToAddProdComponent, {initialState});

    // Pass in data directly content atribute after show
    // this.bsModalRefAdd.content.datos_salida = {id : null, clau : null, nom : null, subGrup: null};
    this.bsModalRefAdd.content.dadesSortida = {producte : null, taula : null, idProd : null, valor: null};
    this.bsModalRefAdd.content.productes = this.productesModal;
    // this.bsModalRefAdd.content.comboInfoModal = this.comboInfoModal;
    // this.bsModalRefAdd.content.productesModal = this.productesModal;

    // this.bsModalRefAdd.content.periodesModal = this.periodesModal;

    // Get out



    this.bsModalRefAdd.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYES();                                
                              else  
                                this.actionPutNO();                                
      })
  }

  actionPutYES(){
    console.log("ACTION PUT YES")
    this.evento_actionToAddAtribut.emit(this.bsModalRefAdd.content.dadesSortida);

  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    console.log("ACTION NO PUT")
    console.log(this.bsModalRefAdd.content.datos_salida);
  }

  
}
