import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompilationService {

  constructor() { }

  keywords: string[] = ['ADDVV', 'ADDSS', 'SUBVV', 'SUBSS', 'MULVS', 'LDS', 'STS', 'LDV', 'STV']
  rawCode: string = ''
  startCompilation(){
    console.log(this.rawCode)

    // split .data & .text into 2 different arrays
    // create a map to hold indentifiers from .data section
    // define format for instrucction
    //    - MULvv V1, V1, V2  (data processing)
    //    - Stv V1, V1, address  (load-store)
    // split string code from .text section by (/n), obtaining each instruccion
  }
  setRawCode(code: string){
    this.rawCode = code
  }
}
