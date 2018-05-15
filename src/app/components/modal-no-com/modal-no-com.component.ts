import { EmpressaService } from './../../services/empressa.service';
import { FormGestioProductesComponent } from './../form-gestio-productes/form-gestio-productes.component';
import { ButtonTaulaGestioPeriodesComponent } from './../button-taula-gestio-periodes/button-taula-gestio-periodes.component';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { TrazaService } from '../../services/traza.service';
import { INgxSelectOption } from 'ngx-select-ex';
import { Subject } from 'rxjs';
import { Periode } from '../../model/periode';
import { RegisterService } from '../../services/register.service';
import { BsModalRef } from 'ngx-bootstrap';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-modal-no-com',
  templateUrl: './modal-no-com.component.html',
  styleUrls: ['./modal-no-com.component.css']
})
export class ModalNoComComponent implements OnInit {
productesNom    : String[];
periodes        : Periode[];
producteSelected: string;
empresaSelected : string;
periodeSelected : Periode;
empreses        : String[];

params = new HttpParams();

registreNoCom   :any;

public ngxValue: any = [];
public ngxDisabled = false;

public doSelectOptions = (options: INgxSelectOption[]) => console.log('MultipleDemoComponent.doSelectOptions', options);

public onClose: Subject<boolean>;

constructor(  private AuthorizationService: AuthorizationService,
              private EmpressaService:  EmpressaService,
              private TrazaService:     TrazaService,
              public bsModalRef:            BsModalRef,
            private RegisterService:    RegisterService) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.getProductesModalName();
  }


  

  canviProdForPeriode(options: INgxSelectOption[])
  {
    // console.log(options);
    // console.log(this.ngxValue);
    // console.log(JSON.parse(JSON.stringify(this.ngxValue)));
    setTimeout(() => this.getPeriodesByProductes(JSON.parse(JSON.stringify(this.ngxValue))), 1000)
  }
  
  public onConfirm(formulario)
  {
    console.log(this.producteSelected);
    console.log(this.periodeSelected);
    console.log(this.empresaSelected);
    this.registreNoCom = {'producte': this.producteSelected, 'periode': this.periodeSelected.id, 'empresa' : this.empresaSelected}
     
    // let params = new HttpParams();
    // this.params = this.params.set('producte', this.producteSelected);
    
    // this.params = this.params.set('periode', `${this.periodeSelected.id}`);

    // this.params = this.params.set('empressa', this.empresaSelected);
    
    this.onClose.next(true);
    
    this.bsModalRef.hide();
  }

  public onCancel(form) {
    
    this.onClose.next(false);

    this.bsModalRef.hide();
  }

  changeSelectedProd($event)
  {
    this.getPeriodesByProductes(this.producteSelected);
    this.getEmpresesByProducte(this.producteSelected);
  }
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

  getProductesModalName()
  {
    if (this.AuthorizationService.is_logged())
      this.EmpressaService.getProductesModalName()
      .subscribe ( respuesta => { this.productesNom = respuesta;
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
  }

  getPeriodesByProductes(productes  :string)
  {
    if (this.AuthorizationService.is_logged())
      this.RegisterService.getPeriodesByProductes(productes)
      .subscribe ( respuesta => { this.periodes = respuesta;
                                  console.log(this.periodes);
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
  }

  getEmpresesByProducte(producte :string)
  {
    if (this.AuthorizationService.is_logged())
    this.EmpressaService.getEmpresesByProd(producte)
    .subscribe ( respuesta => { this.empreses = respuesta;
                              },
                error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
    );
  }

}
