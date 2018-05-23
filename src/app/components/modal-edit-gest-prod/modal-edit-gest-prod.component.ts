import { InfoGestioProd } from './../../interfaces/info-gestio-prod';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthorizationService } from '../../services/authorization.service';
import { RegisterService } from '../../services/register.service';
import { TrazaService } from '../../services/traza.service';
import { Subject } from 'rxjs';
import { LiteralsRegistre } from '../../literals-registre.enum';

@Component({
  selector: 'app-modal-edit-gest-prod',
  templateUrl: './modal-edit-gest-prod.component.html',
  styleUrls: ['./modal-edit-gest-prod.component.css']
})
export class ModalEditGestProdComponent implements OnInit {

  titulo         : string;
  lista          : any[] = [];
  botonCerrar    : string;

  datos_entrada : InfoGestioProd;
  datos_salida  : InfoGestioProd;

  producte: String;
  valor:    String;
  estat:    number;

  public onClose: Subject<boolean>;
  
  private literals = LiteralsRegistre;
  constructor(private translate            : TranslateService,
              public bsModalRef:            BsModalRef,
              private AuthorizationService: AuthorizationService, 
              private RegisterService     : RegisterService, 
              private TrazaService        : TrazaService) { }

  ngOnInit() {

    this.onClose = new Subject();

  }


  public onConfirm(form) {

    // console.log(form);

    
    this.datos_salida.producte = this.producte;
    this.datos_salida.valor = this.valor;
    this.datos_salida.cont = this.estat;
// console.log(this.datos_entrada);
//     console.log(this.datos_salida);
    this.onClose.next(true);
    
    this.bsModalRef.hide();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  public onCancel(form) {
    //console.log("ON CANCEL");    
    //console.log(form);
    
    // this.datos_salida = "DATOS SALIDA ON CANCEL";
    this.onClose.next(false);

    this.bsModalRef.hide();
  }

}
