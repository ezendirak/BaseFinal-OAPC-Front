import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { InfoKey } from '../../interfaces/info-key';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-form-gestio-productes',
  templateUrl: './form-gestio-productes.component.html',
  styleUrls: ['./form-gestio-productes.component.css']
})
export class FormGestioProductesComponent implements OnInit {
  
  @Input() productes:     InfoKey[];
  @Input() families:      InfoKey[];

  @Output() evento_filtroGestioProd: EventEmitter<any> = new EventEmitter();

  // @Output() evento_form1: EventEmitter<any> = new EventEmitter();
  selectedTipusProducte:  InfoKey;
  selectedFamilia:  InfoKey;

  private literals = LiteralsRegistre;
  constructor(private traductorService: TranslateService) { }

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
    this.evento_filtroGestioProd.emit(params);
  }

  
}
