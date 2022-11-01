import { DataProcessingInstructionPartial, InstrucType } from "../text-section-compilation";

export function decodeDataProcessingInstruction(dataProcessingInstr: DataProcessingInstructionPartial, instructionUnits: string[]){
    //! Ejemplos:
        // MOVss F7, #0.56
        // ADDssEQ F6, F6, #1
        // SUBss F5, F5, #1

        // MULss F14, F7, F6
        // SHRss F12, F12, #1
        // CMPss F5, #0

        // ADDvs V, F13, @F12
        // MULvs V, F3, @F12

    
    //EQ flag
    dataProcessingInstr.EQ = instructionUnits[0].includes('EQ') ? '1' : '0'
    //type
    dataProcessingInstr.type = InstrucType.dataProcessing;
    if(instructionUnits[1].includes('V')){  //registro destino es un vector
        dataProcessingInstr.v_s = '1'; //vector (Vd)
    }else{
        dataProcessingInstr.v_s = '0'; //escalar (Rd)
    }
    if(instructionUnits[3]?.includes('@')){
        dataProcessingInstr.ALUflags = '1';
    }else{
        dataProcessingInstr.ALUflags = '0';
    }
    // Destination Register
    dataProcessingInstr.Fd = instructionUnits[1];
    // Source Register 1
    if(instructionUnits[3]) {
        dataProcessingInstr.Fsrc1 = instructionUnits[2];
    }else{      //case CMPss and MOVss
        dataProcessingInstr.Fsrc1 = instructionUnits[1];
    }
    //ALU operation
    dataProcessingInstr.operation = instructionUnits[0].replace('EQ', '');    //p.eje: MOVss, ADDssEQ, SUBss...

    if(instructionUnits[3]?.includes('#')){   //variable (immediate)
        dataProcessingInstr.I = '1';     //se utiliza inmediato
        dataProcessingInstr.sec_operand = {imm: instructionUnits[3]}  //se toma el valor del inmediato
    }
    else{
        if(instructionUnits[2].includes('#')){      //case CMP Fi, #Imm, MOVss F0, #25
            dataProcessingInstr.I = '1';     //se utiliza un registro como Fsrc2
            dataProcessingInstr.sec_operand = {imm: instructionUnits[2]}  //numero de registro Fsrc2
        }
        else{
            dataProcessingInstr.I = '0';     //se utiliza un registro como Fsrc2
            dataProcessingInstr.sec_operand = {Fsrc2: instructionUnits[3].replace('@', '')}  //numero de registro Fsrc2
        }
    }
    
    return dataProcessingInstr
}