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
import { TranslateService } from '@ngx-translate/core';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { MyUser } from '../../interfaces/my-user';
import { InfoKey } from '../../interfaces/info-key';

@Component({
  selector: 'app-modal-no-com',
  templateUrl: './modal-no-com.component.html',
  styleUrls: ['./modal-no-com.component.css']
})
export class ModalNoComComponent implements OnInit {
productesNom    : String[];
periodes        : Periode[];
producteSelected: InfoKey;
empresaSelected : string;
periodeSelected : Periode;
empreses        : String[];

registreNoCom   :any;
miusuario:  MyUser;
productesModal: InfoKey[];
isUser: Boolean = false;
public ngxValue: any = [];
public ngxDisabled = false;

public doSelectOptions = (options: INgxSelectOption[]) => console.log('MultipleDemoComponent.doSelectOptions', options);

public onClose: Subject<boolean>;
private literals = LiteralsRegistre;
constructor(  private AuthorizationService: AuthorizationService,
              private EmpressaService:  EmpressaService,
              private TrazaService:     TrazaService,
              public bsModalRef:            BsModalRef,
              private RegisterService:    RegisterService,
              private translate            : TranslateService) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.miusuario            = JSON.parse(sessionStorage.getItem("USER"));
    console.log(this.miusuario);
    if (this.miusuario.empresa.codi != "Administració"){
      this.empreses = new Array<String>();
      this.empreses.push(this.miusuario.empresa.codi);
      this.isUser = true;
    }else{
      this.isUser = false;
      //Si no es administrador, busquem totes les empreses
    }
    this.empresaSelected = this.miusuario.empresa.codi;
    // this.getProductesModalName();

  }


  

  // canviProdForPeriode(options: INgxSelectOption[])
  // {
  //   // console.log(options);
  //   // console.log(this.ngxValue);
  //   // console.log(JSON.parse(JSON.stringify(this.ngxValue)));
  //   setTimeout(() => this.getPeriodesByProductes(JSON.parse(JSON.stringify(this.ngxValue))), 1000)
  // }
  
  public onConfirm(formulario)
  {
    console.log(this.producteSelected);
    console.log(this.periodeSelected);
    console.log(this.empresaSelected);
    this.registreNoCom = {'producte': this.producteSelected.nom, 'periode': this.periodeSelected.id, 'empresa' : this.empresaSelected}
     
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
    let params = new HttpParams();
     if(this.producteSelected){
      params = params.set('tipusProducte', this.producteSelected.nom);
     }
     if(this.empresaSelected){
      params = params.set('empresa', this.empresaSelected);
     }
     console.log(params);
    this.getPeriodesByProductesAndEmp(params);
  }
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

  getProductesModalName()
  {
    if (this.AuthorizationService.is_logged()){
      this.EmpressaService.getProductesModalName()
      .subscribe ( respuesta => { this.productesNom = respuesta;
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
    }
  }

getPeriodesByProductesAndEmp(params  :HttpParams)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getPeriodesByProductes(params)
      .subscribe ( respuesta => { this.periodes = respuesta;
                                  console.log(this.periodes);
                                },
                  error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
      );
    }
  }

  getEmpresesByProducte(producte :string)
  {
    if (this.AuthorizationService.is_logged()){
    this.EmpressaService.getEmpresesByProd(producte)
    .subscribe ( respuesta => { this.empreses = respuesta;
                              },
                error =>      { this.TrazaService.error("Productes CLAU + NOM", "API GET Registres KO", error); } 
    );
  }
  }

}
