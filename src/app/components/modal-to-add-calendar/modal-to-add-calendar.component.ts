import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthorizationService } from '../../services/authorization.service';
import { TrazaService } from '../../services/traza.service';
import { HttpParams } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Periode } from '../../model/periode';
import { LiteralsRegistre } from '../../literals-registre.enum';

type AOA = any [][];

@Component({
  selector: 'app-modal-to-add-calendar',
  templateUrl: './modal-to-add-calendar.component.html',
  styleUrls: ['./modal-to-add-calendar.component.css']
})

export class ModalToAddCalendarComponent implements OnInit {

  
  public onClose: Subject<boolean>;
  public periodesNous:    Periode[] = new Array<Periode>();

  
  private literals = LiteralsRegistre;
  constructor(private translate            : TranslateService,
              public bsModalRef             :BsModalRef,
              private AuthorizationService  :AuthorizationService,
              private TrazaService          :TrazaService) { }

  ngOnInit() {
    this.onClose = new Subject();
  }


  public onConfirm(form) {
    // console.log("ON CONFIRM");
    console.log("confirmamos");
   
    this.onClose.next(true);
   
    this.bsModalRef.hide();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  public onCancel(form) {
    console.log("cancelamos");
    this.onClose.next(false);

    this.bsModalRef.hide();
  }

  data: AOA = [ [1, 2], [3, 4] ];
  // data: AOA = JSON.stringify(this.items);
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  
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
      // let isSetmanal: boolean = false;
      // let isQuinzenal: boolean = false;

      
      console.log(this.data[0].length);
      
      let index: number = 0;
      for (row in this.data) {
        
        let newPeriode = new Periode();
        index += 1;
        for (fila in row){
          posicio = 0;
          // console.log(this.data[index]);
          for (atribut in this.data[index]){
            // console.log(atribut);
            
            switch (posicio) {
              case 0:
                newPeriode.any = this.data[index][posicio];
                break;
            
              case 1:
                newPeriode.tipusPeriode = this.data[index][posicio];
                
                break;

              case 2:
                newPeriode.numPeriode = this.data[index][posicio];
                break;

              case 3:
                newPeriode.dataInici = this.data[index][posicio];
                break;

              case 4:
                newPeriode.dataFi = this.data[index][posicio];
                break;

              default:
                break;
            }
            
            
            posicio +=1;
          }

          if (newPeriode != undefined) {if (newPeriode.numPeriode.toString() != ''){this.periodesNous.push(newPeriode);}}
          
        }
      }
		};
    reader.readAsBinaryString(target.files[0]);
  }
}
