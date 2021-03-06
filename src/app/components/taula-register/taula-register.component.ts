import { FormControl } from '@angular/forms';
import { HomeComponent } from './../home/home.component';
import { InfoKey } from './../../interfaces/info-key';
import { AtributsComboMap } from './../../interfaces/atributs-combo-map';
import { AtributsComboResponse } from './../../interfaces/atributs-combo-response';
import { RegisterResponse } from './../../interfaces/register-response';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LiteralsRegistre } from './../../literals-registre.enum';
import { ModalNoteComponent } from '../modal-note/modal-note.component';
import { BsModalService, BsModalRef }                     from 'ngx-bootstrap';
import { Periode } from '../../model/periode';
import { MyUser } from '../../interfaces/my-user';
import { AuthorizationService } from '../../services/authorization.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-taula-register',
  templateUrl: './taula-register.component.html',
  styleUrls: ['./taula-register.component.css']
})
export class TaulaRegisterComponent implements OnInit {

 
  @Input() items          :RegisterResponse[];
  @Input() productesModal:     InfoKey[];
  @Input() comboInfoModal: AtributsComboResponse;
  
  @Input() comboGeneral: AtributsComboMap;
  @Input() comboGeneralNoms: AtributsComboMap;
  @Input() nouRegistre;
  @Input() comboLlenoModal: boolean;
  
  @Input() isPinyol: boolean;
  @Input() isLlavor: boolean;
  @Input()  periodesModal:  Periode[];
  
  @Output() evento_list_put:    EventEmitter<any> = new EventEmitter();
  @Output() evento_list_delete: EventEmitter<any> = new EventEmitter();
  @Output() evento_getCombos:   EventEmitter<any> = new EventEmitter();

  @Output() evento_putRegistre:   EventEmitter<any> = new EventEmitter();
  @Output() evento_printItems:   EventEmitter<any> = new EventEmitter();

  // @Output() updatePeriodeModal: EventEmitter<any> = new EventEmitter();
  // productEdit:  RegisterResponse;
  miusuario:  MyUser;
  bsModalRef: BsModalRef;
  registreToEdit: RegisterResponse;
  // productEdit: RegisterResponse;

  private literals = LiteralsRegistre;

  constructor(private translate            : TranslateService,
              private modalService : BsModalService,
              private HomeComponent : HomeComponent,
              private AuthorizationService: AuthorizationService,
              private RegisterService:      RegisterService) {

    translate.setDefaultLang('cat');
   }

  ngOnInit() {
    this.miusuario            = JSON.parse(sessionStorage.getItem("USER"));
  }

  openModalToEdit(item: RegisterResponse) {
    // this.updatePeriodeModal.emit();
    // Pass in data directly before show method
    const initialState = {
      titulo: 'Modificació del registre',
      lista: [],
      botonCerrar: "Tancar"  
    };

    this.bsModalRef = this.modalService.show(ModalNoteComponent, {initialState});
    
    // Pass in data directly content atribute after show
    console.log(JSON.stringify(item));
    this.bsModalRef.content.datos_entrada = item;
    this.bsModalRef.content.datos_salida = item;
    this.bsModalRef.content.producteSelected = this.bsModalRef.content.datos_entrada.tipusProducte;
    this.bsModalRef.content.calibreSelected = this.bsModalRef.content.datos_entrada.calibre;
    this.bsModalRef.content.colorCarnSelected = this.bsModalRef.content.datos_entrada.colorCarn;
    this.bsModalRef.content.qualitatSelected = this.bsModalRef.content.datos_entrada.qualitat;
    this.bsModalRef.content.varietatSelected = this.bsModalRef.content.datos_entrada.varietat;
    this.bsModalRef.content.comboGeneral = this.comboGeneral;
    this.bsModalRef.content.comboGeneralNoms = this.comboGeneralNoms;
    
    this.bsModalRef.content.comboInfoModal = this.comboGeneralNoms[this.bsModalRef.content.producteSelected.nom];
    this.bsModalRef.content.nouPeriode      = this.bsModalRef.content.datos_entrada.periode
    this.getProductesModal(this.bsModalRef.content.datos_salida.usuName); 
    
    console.log(this.bsModalRef.content.productesModal);
    // this.bsModalRef.content.productesModal = this.productesModal;
    this.bsModalRef.content.periodesModal   = this.periodesModal;

    // comprovem les periodes a escollir, si esta el nostre, el sustituïm per que aparegui al desplegable, si no el tenim, l'afegim.
    let control : Boolean = false;
    this.bsModalRef.content.periodesModal.forEach(element => {
      if (element.id == this.bsModalRef.content.datos_entrada.periode.id){
        this.bsModalRef.content.periodesModal.splice(this.bsModalRef.content.periodesModal.indexOf(element),1);
        this.bsModalRef.content.periodesModal.push(this.bsModalRef.content.datos_entrada.periode);
        control = true;
      }
    });
    if(!control){this.bsModalRef.content.periodesModal.push(this.bsModalRef.content.datos_entrada.periode);}
   
    // Get out
    
    this.bsModalRef.content.onClose
      .subscribe( result => { if (result == true)
                                this.actionPutYES();                                
                              else  
                                this.actionPutNO();                                
      })
  }

  actionPutYES(){
    // console.log("ACTION PUT YES")
   
    this.actionToEdit(this.bsModalRef.content.datos_salida);
    // this.actionToEdit(this.productEdit);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  actionPutNO(){
    // console.log("ACTION NO PUT")
    // console.log(this.bsModalRef.content.datos_salida);
  }

  actionToEdit(datos_salida: RegisterResponse){
    this.evento_putRegistre.emit(datos_salida);
  }

  actionPrintItems(items: RegisterResponse[]){
    // console.log("Sortim de Taula");
    // console.log(items);
    this.evento_printItems.emit(items);
  }

  actionDelete(item)
  {
    // console.log("///////////////////////////////////////");
    // console.log(item);
    
    this.evento_list_delete.emit(item);
  }

  getCombos(tipusProducte: string){
    // console.log("getcombos al obrir modal del prod: " + tipusProducte);

    this.evento_getCombos.emit(tipusProducte);
  }


///PASAR A REGISTER
  getProductesModal(userName:  string)
  {
    if (this.AuthorizationService.is_logged()){
      this.RegisterService.getProductesModalByUserName(userName)
      .subscribe ( respuesta => { this.productesModal = respuesta;
                                  this.bsModalRef.content.productesModal = this.productesModal;
                                  // this.TrazaService.dato("Productes MODAL", "API GET Registres OK", this.productes);
                                },
                  error =>      { /*this.TrazaService.error("Productes MODAL", "API GET Registres KO", error); */} 
      );
    }
  }
}
