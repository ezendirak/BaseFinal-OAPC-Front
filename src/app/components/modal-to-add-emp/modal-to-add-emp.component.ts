import { Estats } from './../../model/estats';
import { Component, OnInit } from '@angular/core';
import { InfoEmpressa } from '../../interfaces/info-empressa';
import { InfoKeyClass } from '../../model/info-key-class';
import { INgxSelectOption } from 'ngx-select-ex';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthorizationService } from '../../services/authorization.service';
import { TrazaService } from '../../services/traza.service';
import { EmpressaService } from '../../services/empressa.service';

@Component({
  selector: 'app-modal-to-add-emp',
  templateUrl: './modal-to-add-emp.component.html',
  styleUrls: ['./modal-to-add-emp.component.css']
})
export class ModalToAddEmpComponent implements OnInit {

  titulo          :string;
  lista           :any[] = [];
  botonCerrar     :string;

  productesModal       :InfoKeyClass[] = new Array<InfoKeyClass>();
  productesNom         :string[];

  options         :any=[];
  options2          :any[];

  provaStrings    :string[];

  datos_entrada : InfoEmpressa;
  datos_salida  : InfoEmpressa;


  codiEmpressa  :string;
  estat         :Estats;
  estats        :Estats[] = new Array<Estats>();

  public ngxValue: any = [];
  public ngxDisabled = false;

  public doSelectOptions = (options: INgxSelectOption[]) => console.log('MultipleDemoComponent.doSelectOptions', options);

  public onClose: Subject<boolean>;
  
  constructor(private traductorService      :TranslateService,
              public bsModalRef             :BsModalRef,
              private AuthorizationService  :AuthorizationService, 
              // private RegisterService     : RegisterService, 
              private TrazaService          :TrazaService,
              private EmpressaService       :EmpressaService) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.getProductesModalName();
  }


  public onConfirm(form) {
    // console.log("ON CONFIRM");
    console.log("confirmamos");
    console.log(JSON.stringify(this.ngxValue));
    if (this.codiEmpressa) this.datos_salida.codi = this.codiEmpressa;
    if (this.estat) this.datos_salida.estat = this.estat;

    this.datos_salida.tipusProductes = JSON.parse(JSON.stringify(this.ngxValue));
    console.log(this.datos_salida);
    this.onClose.next(true);
   
    this.bsModalRef.hide();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  public onCancel(form) {
    console.log("cancelamos");
    this.onClose.next(false);

    this.bsModalRef.hide();
  }

  getProductesModalName()
  {
    if (this.AuthorizationService.is_logged())
      this.EmpressaService.getProductesModalName()
      .subscribe ( respuesta => { this.productesNom = respuesta;
                                  console.log("prrrrrrrrrrrrrrrrrrra");
                                  console.log(this.estats);
                                  // console.log(this.options);
                                  // this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
  }
}
