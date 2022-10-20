// [ ['ALUop'], ['Vsrc1'], ['Vsrc2'] ]
enum InstrucType {
    dataProcessing = '0',
    loadStore = '1',
}
export interface DataProcessingInstruction {
    type: InstrucType,
    v_s: string,
    ss: string,
    I: string,
    Vd_Rd: string,
    Vsrc_Rsrc: string,
    operation: string,
    sec_operand: SecondOperand
}
export interface LoadStoreInstruction {
    type: InstrucType,
    v_s: string,
    L_S: string,
    I: string,
    Vd_Rd: string,
    rm: SecondOperand
}
export interface SecondOperand{
    imm?: string,
    Vsrc2_Rsrc2?: string
}
type LoadStoreInstructionPartial = Partial<LoadStoreInstruction>;
type DataProcessingInstructionPartial = Partial<DataProcessingInstruction>;

const loadStoreInstrucs = ['lds', 'ldv', 'sts', 'stv']
export function compileTextSection(textSection: string[]){
    console.log(textSection)
    textSection.forEach(instruc => {
        let instructionUnits = removeCommaFromInstrucUnits(instruc.split(' '));
        console.log(instructionUnits);
        if(loadStoreInstrucs.indexOf(instructionUnits[0].toLowerCase()) != -1){ //Es un load
            let loadStoreInst: LoadStoreInstructionPartial = {}
            loadStoreInst.type = InstrucType.loadStore;         //set instruction type (load/store)
            if(instructionUnits[0].at(-1) == 'V'){  //registro destino es un vector
                loadStoreInst.v_s = '1' //vector (Vd)
            }else{
                loadStoreInst.v_s = '0' //escalar (Rd)
            }
            if(instructionUnits[0].includes('LD')){ //es un load?
                loadStoreInst.L_S = '0' //load
            }else{
                loadStoreInst.L_S = '1' //store
            }
            loadStoreInst.Vd_Rd = instructionUnits[1];  // tomar registro destino (F0-F7/V0-V7)
            if(instructionUnits[2].includes('$') || instructionUnits[2].includes('#')){   //variable (immediate)
                loadStoreInst.I = '1';
                loadStoreInst.rm = {imm: instructionUnits[2]}
            }else{
                loadStoreInst.I = '0';
                loadStoreInst.rm = {Vsrc2_Rsrc2: instructionUnits[2]}
            }

            console.log(loadStoreInst)
        }
    })
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