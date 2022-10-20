import { Injectable } from '@angular/core';
import { compileTextSection } from './compilation/text-section-compilation'
@Injectable({
  providedIn: 'root'
})
export class CompilationService {

  constructor() { }
  /*
  .data;
  define addr = 1;
  define addr2 = 1000;
  define addr3 = 15000;
  .text;
  ADDVV V1, V1, V2;
  LDs F0, $addr;
  ADDSS F0, F0, #50000;
  */
  textKeywords: string[] = ['ADDVV', 'ADDSS', 'SUBVV', 'SUBSS', 'MULVS', 'LDS', 'STS', 'LDV', 'STV']
  dataKeywords: string[] = ['DEFINE']
  rawCode: string = ''

  //.data section
  varsMap: Map<string, string> = new Map();

  startCompilation(){
    //add each instruction to an array
    const rawInstrucs = this.rawCode.split('\n')
    //remove ';' and whitespace to each instruction
    const trimmedInstrucs = rawInstrucs.map(instr => {
      if(instr.includes(';')) return instr.trim().replace(';', '')   //remove ';'
      return instr.trim()
    })
    // filter for empty string
    const filteredInstrucs = trimmedInstrucs.filter(i => (i) ? true : false)
    //find index of .text instructions beginning
    const textSectionIndex = filteredInstrucs.findIndex(instruc => instruc.includes('.text'))
    // split instructions according to section
    const dataInstructions = filteredInstrucs.slice(1,textSectionIndex);   //.data instructions
    const textInstructions = filteredInstrucs.slice(textSectionIndex+1);   //.text instructions
    console.log('.data: ')
    this.setVariblesMap(dataInstructions);
    console.log(this.varsMap);
    console.log('.text: ')
    // start compilation of actual code (.text section)
    compileTextSection(textInstructions);
  }

  setVariblesMap(dataInstrucs: string[]){
    dataInstrucs.forEach(instruc => {
      const units = instruc.split(' ');
      this.varsMap.set(units[1], units[3]);
    });
  }
  setRawCode(code: string){
    this.rawCode = code
  }
}
