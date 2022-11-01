import { decodeDataProcessingInstruction } from "./decode-instructions/decode-data-proc-instr";
import { decodeLoadStoreInstruction } from "./decode-instructions/decode-load-store-instr";
import { fromInstructionsToBinaryCode } from "./to-binary/binary-translation";

export let InstructionList: (DataProcessingInstruction | LoadStoreInstruction)[] = [];
interface Instruction {
    type: InstrucType,
    v_s: string,
    I: string,
    Fd: string,
    EQ: string,
}
export enum InstrucType {
    dataProcessing = '0',
    loadStore = '1',
}
export interface DataProcessingInstruction extends Instruction {
    ALUflags: string,
    Fsrc1: string,
    operation: string,
    sec_operand: SecondOperand
}
export interface LoadStoreInstruction extends Instruction {
    L_S: string,
    dir: SecondOperand
}
export interface SecondOperand{
    imm?: string,
    Fsrc2?: string
}
export type LoadStoreInstructionPartial = Partial<LoadStoreInstruction>;
export type DataProcessingInstructionPartial = Partial<DataProcessingInstruction>;

function fromPartialToMatchType(partialObj: Partial<any>): any {
    return Object.assign({...partialObj})
}
const loadStoreInstrucs = ['LDS', 'LDV', 'STS', 'STV'];
const dataProcessingInstrucs = ['MOVSS', 'ADDSS', 'SUBSS', 'MULSS', 'SHRSS', 'CMPSS', 'ADDSS', 'MULVS'];
export function compileTextSection(textSection: string[], vars: Map<string, string>){
    InstructionList = [];       //reset instructions
    textSection.forEach(instruc => {
        let instructionUnits = removeExtraSymbsFromInstrucUnits(instruc.split(' '));
        if(loadStoreInstrucs.indexOf(instructionUnits[0].toLocaleUpperCase()) != -1){ //Instruccion de load/store
            let loadStoreInst: LoadStoreInstructionPartial = {}
            loadStoreInst = decodeLoadStoreInstruction(loadStoreInst, instructionUnits);
            InstructionList.push(fromPartialToMatchType(loadStoreInst));
        }
        if(dataProcessingInstrucs.indexOf(instructionUnits[0].toLocaleUpperCase()) != -1){ //Instruccion de procesamiento de datos
            let dataProcessingInstr: DataProcessingInstructionPartial = {}
            dataProcessingInstr = decodeDataProcessingInstruction(dataProcessingInstr, instructionUnits);
            InstructionList.push(fromPartialToMatchType(dataProcessingInstr));
        }
    })
    console.log(InstructionList)
    fromInstructionsToBinaryCode(InstructionList, vars);

}


function removeExtraSymbsFromInstrucUnits(units: string[]): string[] {
    let resultUnits: string[] = [];
    units.forEach((unit) => {
        let tmpUnit = '';
        if(unit.includes(',')) {
            tmpUnit = unit.replace(',', '')
        }else if(unit.includes('[') && unit.includes(']')) {
            tmpUnit = unit.replace('[', '').replace(']', '')
        }else{
            tmpUnit = unit
        }
        resultUnits.push(tmpUnit);
    })
    return resultUnits
}