import { decodeDataProcessingInstruction } from "./decode-instructions/decode-data-proc-instr";
import { decodeLoadStoreInstruction } from "./decode-instructions/decode-load-store-instr";
import { fromInstructionsToBinaryCode } from "./to-binary/binary-translation";

export const InstructionList: (DataProcessingInstruction | LoadStoreInstruction)[] = [];
interface Instruction {
    type: InstrucType,
    v_s: string,
    I: string,
    Vd_Rd: string,
}
export enum InstrucType {
    dataProcessing = '00',
    loadStore = '01',
    brach = '10'
}
export interface DataProcessingInstruction extends Instruction {
    ss: string,
    Vsrc_Rsrc: string,
    operation: string,
    sec_operand: SecondOperand
}
export interface LoadStoreInstruction extends Instruction {
    L_S: string,
    rm: SecondOperand
}
export interface SecondOperand{
    imm?: string,
    Vsrc2_Rsrc2?: string
}
export type LoadStoreInstructionPartial = Partial<LoadStoreInstruction>;
export type DataProcessingInstructionPartial = Partial<DataProcessingInstruction>;

function fromPartialToMatchType(partialObj: Partial<any>): any {
    return Object.assign({...partialObj})
}
const loadStoreInstrucs = ['LDS', 'LDV', 'STS', 'STV'];
const dataProcessingInstrucs = ['ADDVV', 'ADDSS', 'SUBVV', 'SUBSS', 'MULVS'];
export function compileTextSection(textSection: string[]){
    textSection.forEach(instruc => {
        let instructionUnits = removeCommaFromInstrucUnits(instruc.split(' '));
        console.log(instructionUnits);
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
    console.log(InstructionList);
    fromInstructionsToBinaryCode(InstructionList)
}


function removeCommaFromInstrucUnits(units: string[]): string[] {
    let resultUnits: string[] = [];
    units.forEach((unit) => {
        if(unit.includes(',')) {
            resultUnits.push(unit.replace(',',''));
        }
        else {
            resultUnits.push(unit);
        }
    })
    return resultUnits
}