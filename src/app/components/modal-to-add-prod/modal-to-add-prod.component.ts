import { AtributsComboMap } from './../../interfaces/atributs-combo-map';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InfoKey } from '../../interfaces/info-key';
import { InfoKeyClass } from '../../model/info-key-class';
import { BsModalRef } from 'ngx-bootstrap';
import { HttpParams } from '@angular/common/http';
import { NewProdDto } from '../../model/new-prod-dto';

@Component({
  selector: 'app-modal-to-add-prod',
  templateUrl: './modal-to-add-prod.component.html',
  styleUrls: ['./modal-to-add-prod.component.css']
})
export class ModalToAddProdComponent implements OnInit {

  public onClose: Subject<boolean>;

  selectedProducte      :InfoKeyClass;
  selectedAtribut       :string;
  selectedValor         :string;

  atrDisabled           :Boolean;
  valorDisabled         :Boolean;

  dadesSortida          :NewProdDto;

  atributs              :String[];

  // params = new HttpParams();
  // newRegistre           :any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.atrDisabled = true; 
    this.valorDisabled = true;
  }

  changeSelectedTipusProducte($event)
  {
    console.log(this.selectedProducte);
    if (this.selectedProducte.subGrup == 'PI'){
      //CAMPS DE PINYOL (COLORCARN)
      this.atributs = ["COLORCARN", "QUALITAT", "CALIBRE"];
      this.atrDisabled=false;
    }else if (this.selectedProducte.subGrup == 'LL'){
      //CAMPS DE LLAVOR (VARIETAT)
      this.atributs = ["VARIETAT", "QUALITAT", "CALIBRE"];
      this.atrDisabled=false;
    }
  }

  changeSelectedAtribut($event)
  {
    this.valorDisabled = false;
  }

  public onConfirm(form) {

    console.log(form);

    
    this.dadesSortida.idProd = this.selectedProducte.id
    this.dadesSortida.producte = this.selectedProducte.nom;
    this.dadesSortida.taula = this.selectedAtribut;
    this.dadesSortida.valor = this.selectedValor;

    // console.log(this.params);
    this.onClose.next(true);
    
    this.bsModalRef.hide();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  public onCancel(form) {
    //console.log("ON CANCEL");    
    //console.log(form);
    
    this.onClose.next(false);

    this.bsModalRef.hide();
  }
  
}
