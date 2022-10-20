import { DataProcessingInstructionPartial, InstrucType } from "../text-section-compilation";

export function decodeDataProcessingInstruction(dataProcessingInstr: DataProcessingInstructionPartial, instructionUnits: string[]){
    // ADDVV V1, V1, V2;
    // ADDSS F0, F0, #50000;
    // MULVS V1, V1, F3;
    //type
    dataProcessingInstr.type = InstrucType.dataProcessing;
    //ALU operation
    dataProcessingInstr.operation = instructionUnits[0];    //p.eje: ADDVV, ADDSS, MULVS...
    // Destination Register
    dataProcessingInstr.Vd_Rd = instructionUnits[1];
    // Source Register 1
    dataProcessingInstr.Vsrc_Rsrc = instructionUnits[2];

    if(instructionUnits[1].includes('V')){  //registro destino es un vector
        dataProcessingInstr.v_s = '1' //vector (Vd)
    }else{
        dataProcessingInstr.v_s = '0' //escalar (Rd)
    }
    if(!instructionUnits[3].includes('V')){  //registro src2 es un escalar
        dataProcessingInstr.ss = '1' //escalar (Rd)
    }else{
        dataProcessingInstr.ss = '0' //vector (Vd)
    }
    if(instructionUnits[3].includes('$') || instructionUnits[3].includes('#')){   //variable (immediate)
        dataProcessingInstr.I = '1';     //se utiliza inmediato
        dataProcessingInstr.sec_operand = {imm: instructionUnits[3]}  //se toma el valor del inmediato
    }else{
        dataProcessingInstr.I = '0';     //se utiliza un registro como R/Vsrc2
        dataProcessingInstr.sec_operand = {Vsrc2_Rsrc2: instructionUnits[3]}  //numero de registro R/Vsrc2
    }
    
    return dataProcessingInstr
}