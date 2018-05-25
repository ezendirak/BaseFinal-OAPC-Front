import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { TranslateService } from '@ngx-translate/core';
import { InfoGestioReg } from '../../model/info-gestio-reg';
import { FormGroup, FormControl } from '@angular/forms';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-taula-gestio-register',
  templateUrl: './taula-gestio-register.component.html',
  styleUrls: ['./taula-gestio-register.component.css']
})
export class TaulaGestioRegisterComponent implements OnInit {

@Input()  items :InfoGestioReg[];

@Output() evento_putProducteEmpresaPeriode:   EventEmitter<any> = new EventEmitter();

  private literals = LiteralsRegistre;

  constructor(private translate: TranslateService
              ) { 

    translate.setDefaultLang('cat');
  }

  ngOnInit() {
    this.translate.setDefaultLang('cat');
    // console.log("undefined: ");
    // console.log(this.items);
  }

  periodeForm = new FormGroup ({
    pendent:              new FormControl(),
    registrat:            new FormControl(),
    noComercialitzacio:   new FormControl(),
    tancat:               new FormControl()
  })
  
  
  
  testting($event){
    // console.log($event);
    $event.pendent = true;
    // console.log($event);
    // console.log("siuuu");
  }

  updateTancat(item: InfoGestioReg)
  {
    item.tancat = true;
    item.pendent = false;
    item.registrat = false;
    item.noComercialitzacio = false;
    this.evento_putProducteEmpresaPeriode.emit(item);
  }

  updateRegistrat(item: InfoGestioReg)
  {
    item.tancat = false;
    item.pendent = false;
    item.registrat = true;
    item.noComercialitzacio = false;
    this.evento_putProducteEmpresaPeriode.emit(item);
  }

  updatePendent(item: InfoGestioReg)
  {
    item.tancat = false;
    item.pendent = true;
    item.registrat = false;
    item.noComercialitzacio = false;
    this.evento_putProducteEmpresaPeriode.emit(item);
  }

  updateNoComer(item: InfoGestioReg)
  {
    item.tancat = false;
    item.pendent = false;
    item.registrat = false;
    item.noComercialitzacio = true;
    this.evento_putProducteEmpresaPeriode.emit(item);
  }
}
