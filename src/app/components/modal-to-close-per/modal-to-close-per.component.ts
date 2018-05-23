import { Component, OnInit } from '@angular/core';
import { InfoKey } from '../../interfaces/info-key';
import { INgxSelectOption } from 'ngx-select-ex';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthorizationService } from '../../services/authorization.service';
import { TrazaService } from '../../services/traza.service';
import { EmpressaService } from '../../services/empressa.service';
import { LiteralsRegistre } from '../../literals-registre.enum';

@Component({
  selector: 'app-modal-to-close-per',
  templateUrl: './modal-to-close-per.component.html',
  styleUrls: ['./modal-to-close-per.component.css']
})
export class ModalToClosePerComponent implements OnInit {

  productes:  InfoKey[];
  productesNom:       String[];
  productesSelected:  String[];
  public ngxValue: any = [];
  public ngxDisabled = false;

  public doSelectOptions = (options: INgxSelectOption[]) => console.log('MultipleDemoComponent.doSelectOptions', options);
  private literals = LiteralsRegistre;
  public onClose: Subject<boolean>;
  constructor(private translate            : TranslateService,
              public bsModalRef             :BsModalRef,
              private AuthorizationService  :AuthorizationService, 
              // private RegisterService     : RegisterService, 
              private TrazaService          :TrazaService,
              private EmpressaService       :EmpressaService) { 
                
              }

              
  ngOnInit() {
    this.onClose = new Subject();
    this.getProductesModalName();
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

    console.log(form);
    this.productesSelected = JSON.parse(JSON.stringify(this.ngxValue));
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
