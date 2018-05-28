import { Register } from './../../model/register';
import { RegisterResponse } from './../../interfaces/register-response';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import * as XLSX from 'xlsx';
import { HttpParams } from '@angular/common/http';



type AOA = any [][];

@Component({
  selector: 'app-lector-excel',
	template: `
	<input type="file" (change)="onFileChange($event)" multiple="false" />
	`
})

export class LectorExcelComponent {

  @Input() items          :RegisterResponse[];
  
  @Output() evento_AfegirXLS: EventEmitter<any> = new EventEmitter();
  @Output() evento_DescarregarXLS: EventEmitter<any> = new EventEmitter();

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
      for (row in this.data) {
        
        let newRegistre = new Register();
        index += 1;
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
            let familia: number;
            /////FAMILIA 1 => is PINYOL /////// FAMILIA 2 => is LLAVOR  ////// FAMILIA 3 => will be SECA
            if(isPinyol){
              params = params.set('Familia', "1");
              familia = 1;
            }else if (isLlavor){
              params = params.set('Familia', "2");
              familia = 2;
            }
            
     
            // this.saveFromExcel(newRegistre, params);
            this.saveFromExcel(newRegistre, familia);
          }
          
        }
        //console.log(newRegistre);
      }
      
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
    console.log(this.items);
    // this.evento_DescarregarXLS.emit();
  }
  
  saveFromExcel(newRegistre: Register, familia:  number){
    console.log("Sortim del lector");
    this.evento_AfegirXLS.emit({newRegistre, familia});
  }

  contains(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === b) {
            return true;
        }
    }
    return false;
  }
  
}
