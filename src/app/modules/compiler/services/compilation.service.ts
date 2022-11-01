import { Injectable } from '@angular/core';
import { compileTextSection } from './compilation/text-section-compilation'
@Injectable({
  providedIn: 'root'
})
export class CompilationService {

  constructor() { }
  /*
  .text:
  MOVss F5, #6;
  MOVss F6, #0;
  MOVss F7, #0.56;
  MOVss F8, #0;

  LDs F0, [#1];
  LDs F1, [#2];
  LDs F2, [#3];
  LDs F3, [#4];
  LDs F4, [#5];

  MULss F14, F7, F6;

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
    //!const dataInstructions = filteredInstrucs.slice(1,textSectionIndex);   //.data instructions
    const textInstructions = filteredInstrucs.slice(textSectionIndex+1);   //.text instructions
    //! console.log('.data: ')
    //! this.setVariblesMap(dataInstructions);
    //console.log(this.varsMap);
    console.log('.text: ')
    // start compilation of actual code (.text section)
    console.log(textInstructions)
    compileTextSection(textInstructions, this.varsMap);
  }

  setVariblesMap(dataInstrucs: string[]){
    this.varsMap.clear();
    dataInstrucs.forEach(instruc => {
      const units = instruc.split(' ');
      this.varsMap.set(units[1], units[3]);
    });
  }
  setRawCode(code: string){
    this.rawCode = code
  }
}
