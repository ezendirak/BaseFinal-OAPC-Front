import { Estats } from './../../model/estats';
import { InfoKey } from './../../interfaces/info-key';
import { InfoEmpressa } from './../../interfaces/info-empressa';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthorizationService } from '../../services/authorization.service';
import { TrazaService } from '../../services/traza.service';
import { Subject } from 'rxjs';
import { EmpressaService } from '../../services/empressa.service';
import { InfoKeyClass } from '../../model/info-key-class';
import { INgxSelectOption } from 'ngx-select-ex';
import { LiteralsRegistre } from '../../literals-registre.enum';

@Component({
  selector: 'app-modal-edit-gest-emp',
  templateUrl: './modal-edit-gest-emp.component.html',
  styleUrls: ['./modal-edit-gest-emp.component.css']
})
export class ModalEditGestEmpComponent implements OnInit {
  
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
  estats        :Estats[];
  public ngxValue: any = [];
  public ngxDisabled = false;

  public doSelectOptions = (options: INgxSelectOption[]) => console.log('MultipleDemoComponent.doSelectOptions', options);

  public onClose: Subject<boolean>;
  private literals = LiteralsRegistre;
  constructor(private translate            : TranslateService,
              public bsModalRef             :BsModalRef,
              private AuthorizationService  :AuthorizationService, 
              // private RegisterService     : RegisterService, 
              private TrazaService          :TrazaService,
              private EmpressaService       :EmpressaService) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.getProductesModalName()

    // this.estat = new Estats();
    // setTimeout(() => {if(this.datos_entrada.estat.valor == '1')
    //                   { 
    //                     this.estat = {'nom':'Actiu', 'valor': '1'}
    //                   }
    //                   if(this.datos_entrada.estat.valor == '0')
    //                   { 
    //                     this.estat = {'nom':'Inactiu', 'valor': '0'}
    //                   }
    //                 }, 0);
  }


  getProductesModal()
  {
    if (this.AuthorizationService.is_logged()){
      this.EmpressaService.getProductesModal()
      .subscribe ( respuesta => { this.productesModal = respuesta;

                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
    }
  }

  getProductesModalName()
  {
    if (this.AuthorizationService.is_logged()){
      this.EmpressaService.getProductesModalName()
      .subscribe ( respuesta => { this.productesNom = respuesta;
                                  console.log("prrrrrrrrrrrrrrrrrrra");
                                  // console.log(this.options);
                                  // this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.productes);
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
    }
  }

  public onConfirm(form) {
    
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
}
