import { InstrucType, LoadStoreInstructionPartial } from "../text-section-compilation";

export function decodeLoadStoreInstruction(loadStoreInstr: LoadStoreInstructionPartial, instructionUnits: string[]){
    //! Ejemplos:
        // LDs F0, [#1]
        // LDv V,  [F8]
        // STv V, [F14]
    //EQ flag
    loadStoreInstr.EQ = instructionUnits[0].includes('EQ') ? '1' : '0';
    loadStoreInstr.type = InstrucType.loadStore;         //set instruction type (load/store)
    if(instructionUnits[1].includes('V')){  //registro destino es un vector
        loadStoreInstr.v_s = '1' //vector (Vd)
    }else{
        loadStoreInstr.v_s = '0' //escalar (Rd)
    }
    if(instructionUnits[0].includes('LD')){ //es un load?
        loadStoreInstr.L_S = '0' //load
    }else{
        loadStoreInstr.L_S = '1' //store
    }
    loadStoreInstr.Fd = instructionUnits[1];  // tomar registro destino (F0-F7/V0-V7)
    if(instructionUnits[2].includes('#')){   //variable (immediate)
        loadStoreInstr.I = '1';     //se utiliza inmediato
        loadStoreInstr.dir = {imm: instructionUnits[2]}  //se toma el valor del inmediato
    }else{
        loadStoreInstr.I = '0';     //se utiliza un registro como R/Vsrc2
        loadStoreInstr.dir = {Fsrc2: instructionUnits[2]}  //numero de registro R/Vsrc2
    }
    return loadStoreInstr
}