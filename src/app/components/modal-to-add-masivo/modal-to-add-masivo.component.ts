import { Component, OnInit } from '@angular/core';
import { Register } from '../../model/register';
import { HttpParams } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { MyUser } from '../../interfaces/my-user';
import { Subject } from 'rxjs';
import { LiteralsRegistre } from '../../literals-registre.enum';
import { BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from '../../services/authorization.service';
import { RegisterService } from '../../services/register.service';
import { EmpressaService } from '../../services/empressa.service';
import { TrazaService } from '../../services/traza.service';


type AOA = any [][];


@Component({
  selector: 'app-modal-to-add-masivo',
  templateUrl: './modal-to-add-masivo.component.html',
  styleUrls: ['./modal-to-add-masivo.component.css']
})


export class ModalToAddMasivoComponent implements OnInit {

  // @Output() evento_AfegirXLS: EventEmitter<any> = new EventEmitter();
  // @Output() evento_DescarregarXLS: EventEmitter<any> = new EventEmitter();

  data: AOA = [ [1, 2], [3, 4] ];
  // data: AOA = JSON.stringify(this.items);
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  familia:  number;
  eInformant : string;
  uInformant: string;
  usersList:  String[];
  empresses:  String[];
  miusuario:  MyUser = JSON.parse(sessionStorage.getItem("USER"));

  public onClose: Subject<boolean>;
  registres:  Register[];

  private literals = LiteralsRegistre;

  isUser  : Boolean = true;
  constructor(public bsModalRef: BsModalRef,
              private translate            :  TranslateService,
              private AuthorizationService:   AuthorizationService,
              private RegisterService :       RegisterService,
              private EmpressaService:        EmpressaService,
              private TrazaService:           TrazaService) { }


  ngOnInit() {
    this.onClose = new Subject();

    this.miusuario            = JSON.parse(sessionStorage.getItem("USER"));
    console.log(this.miusuario);

    if (this.miusuario.empresa.codi == 'Administració'){
      this.getEmpresses();
      this.isUser=false;
      this.eInformant = '';
      let params = new HttpParams();
      this.getUsersByEmp(params);
    }else {this.isUser=true;}
  }

	onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    
    const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      let row: any;
      let fila: any;
      let atribut: any;
      let posicio: number;
      let isPinyol: boolean = false;
      let isLlavor: boolean = false;

      
      console.log(this.data[0].length);
      switch (this.data[0].length) {
        case 7:
          // isPinyol = true;
          if (this.contains(this.data[0], 'Varietat')){
            isLlavor = true;
            console.log("TENIM VARIETAT; ES LLAVOR");
          }else if(this.contains(this.data[0], 'Color')){
            isPinyol = true;
            console.log("TENIM COLOR DE CARN; ES PINYOL");
          }
          break;
      
        default:
          break;
      }
      let index: number = 0;
      this.registres = new Array<Register>();
      for (row in this.data) {
        
        let newRegistre = new Register();
        index += 1;
        if(this.isUser){
          newRegistre.uInformant = this.miusuario.user;
        }else{
          newRegistre.uInformant = this.uInformant;
        }
        
        for (fila in row){
          posicio = 0;
          // console.log(this.data[index]);
          for (atribut in this.data[index]){
            // console.log(atribut);
            
            switch (posicio) {
              case 0:
                newRegistre.periode = this.data[index][posicio];
                if (newRegistre.periode[1]!= " "){newRegistre.periode = newRegistre.periode[0] + newRegistre.periode[1];}
                else {newRegistre.periode = newRegistre.periode[0]}
                
                console.log(newRegistre.periode);
                break;
            
              case 1:
                newRegistre.tipusProducte = this.data[index][posicio];
                break;

              case 2:
                if (isPinyol){
                  newRegistre.colorCarn = this.data[index][posicio];
                }
                else if (isLlavor){
                  newRegistre.varietat = this.data[index][posicio];
                }
                break;

              case 3:
                newRegistre.qualitat = this.data[index][posicio];
                break;

              case 4:
                newRegistre.calibre = this.data[index][posicio];
                break;

              case 5:
                newRegistre.quantitatVenuda = this.data[index][posicio];
                break;

              case 6:
                newRegistre.preuSortida = this.data[index][posicio];
                break;
                
              default:
                break;
            }
            
            
            posicio +=1;
          }
          // console.log("Registre guardat: ");
          // console.log(newRegistre);
          if (newRegistre.tipusProducte != null){
            let params = new HttpParams();
            // this.familia = new number();: number;
            /////FAMILIA 1 => is PINYOL /////// FAMILIA 2 => is LLAVOR  ////// FAMILIA 3 => will be SECA
            if(isPinyol){
              params = params.set('Familia', "1");
              this.familia = 1;
            }else if (isLlavor){
              params = params.set('Familia', "2");
              this.familia = 2;
            }
            
     
            // this.saveFromExcel(newRegistre, params);
            // this.saveFromExcel(newRegistre, familia);
            this.registres.push(newRegistre);
          }
          
        }
        console.log(newRegistre);
        
      }
      console.log(this.registres);
		};
    reader.readAsBinaryString(target.files[0]);
    
	}

	export(): void {
		// /* generate worksheet */
		// const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

		// /* generate workbook and add the worksheet */
		// const wb: XLSX.WorkBook = XLSX.utils.book_new();
		// XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		// /* save to file */
    // XLSX.writeFile(wb, this.fileName);
    // console.log(this.items);
    // this.evento_DescarregarXLS.emit();
  }
  
  saveFromExcel(newRegistre: Register, familia:  number){
    console.log("Sortim del lector");
    // this.evento_AfegirXLS.emit({newRegistre, familia});
  }

  contains(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === b) {
            return true;
        }
    }
    return false;
  }

  public onConfirm(form) {

    console.log(form);
    console.log(this.registres);
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

  getUsersByEmp(params: HttpParams)
  {
    if (this.AuthorizationService.is_logged())
    {
      this.RegisterService.getUsersByEmp(params)
      .subscribe ( respuesta => { this.usersList = respuesta;  
                                  console.log(this.usersList);
                                  this.TrazaService.dato("USERS", "API USERS OK(",this.usersList); 
                                },
                  error =>      { this.TrazaService.error("USERS", "API USERS KO", error); } 
      );
    }
  }

  getEmpresses()
  {
    if (this.AuthorizationService.is_logged()){
      this.EmpressaService.getEmpressaActivaNoTotes()
      .subscribe ( respuesta => { this.empresses = respuesta;

                                  console.log(this.empresses);
                                   this.TrazaService.dato("Productes CLAU + NOM", "API GET Registres OK", this.empresses);
                                },
                  error =>      { this.TrazaService.error("EMPRESSES NOM", "API GET EMPRESSES KO", error); } 
      );
    }
  }

  changeSelectedEmpresa(eInformant)
  {
    let params = new HttpParams();
    if (this.eInformant && this.eInformant != 'Totes'){params = params.set('eInformant', this.eInformant);}
    
    this.getUsersByEmp(params);
  }

}
