import { DataProcessingInstruction, InstrucType, LoadStoreInstruction, SecondOperand } from "../text-section-compilation";

export const binaryResult: string[] = [];

const vectorRegisterMap = new Map<string, string>();
const vecRegNum = 8;
const scaRegNum = 16;
// Codigo binario de cada registro vectorial y escalar
for(let i=0; i<vecRegNum; i++) vectorRegisterMap.set(`V${i.toString()}`, i.toString(2).padStart(3, '0'))
const scalarRegisterMap = new Map<string, string>();
for(let i=0; i<scaRegNum; i++) scalarRegisterMap.set(`F${i.toString()}`, i.toString(2).padStart(4, '0'))

// ALU Operations
const ALUOperationsMap = new Map<string, string>();
ALUOperationsMap.set('MOVSS', '000');
ALUOperationsMap.set('ADDSS', '001');
ALUOperationsMap.set('SUBSS', '010');
ALUOperationsMap.set('MULSS', '011');
ALUOperationsMap.set('SHRSS', '100');
ALUOperationsMap.set('CMPSS', '101');
ALUOperationsMap.set('ADDVS', '110');
ALUOperationsMap.set('MULVS', '111');

export function fromInstructionsToBinaryCode(instructions: (DataProcessingInstruction | LoadStoreInstruction)[], vars: Map<string, string>){
    console.log('To binary....')
    instructions.forEach((instruction) => {
        let binaryInstr = ''
        if(instruction.type === InstrucType.dataProcessing){
            buildDataProcessing(binaryInstr, instruction as DataProcessingInstruction, vars)
        }
        if(instruction.type === InstrucType.loadStore){
            buildLoadStore(binaryInstr, instruction as LoadStoreInstruction, vars)
        }
    })
    console.log(binaryResult)
    
}
function buildDataProcessing(binaryInstr:string, instruction: DataProcessingInstruction, vars: Map<string, string>){
    const totalBits: {magBits: number, frBits: number} = {
        magBits: 9,
        frBits: 6,
    }
    binaryInstr += instruction.EQ
    binaryInstr += 'X'
    binaryInstr += InstrucType.dataProcessing;  //0
    binaryInstr += instruction.v_s; //v_s
    binaryInstr += instruction.ALUflags;  // scalar support
    binaryInstr += instruction.I;   // immediate
    binaryInstr += getBinaryFromRegisterNum(instruction.Fd); //vd/rd
    binaryInstr += getBinaryFromRegisterNum(instruction.Fsrc1); // Vsrc / Rsrc
    binaryInstr += ALUOperationsMap.get(instruction.operation.toLocaleUpperCase()); //000 -> ADDvv
    binaryInstr += resolveBinarySecondOperand(instruction.sec_operand, totalBits);
    binaryInstr = binaryInstr.padStart(32, 'X')
    binaryResult.push(binaryInstr);
}
function buildLoadStore(binaryInstr:string, instruction: LoadStoreInstruction, vars: Map<string, string>){
    const totalBits: {magBits: number, frBits: number} = {
        magBits: 22,
        frBits: 0,
    }
    binaryInstr += instruction.EQ;
    binaryInstr += 'X'
    binaryInstr += InstrucType.loadStore;  //1
    binaryInstr += instruction.v_s; //v_s
    binaryInstr += instruction.L_S;  // load / store
    binaryInstr += instruction.I;   // immediate
    binaryInstr += getBinaryFromRegisterNum(instruction.Fd); //vd/rd
    binaryInstr += resolveBinarySecondOperand(instruction.dir, totalBits); //Rm -> Imm v Rscr / Vsrc
    binaryInstr = binaryInstr.padStart(32, 'X')
    binaryResult.push(binaryInstr);
}
function resolveBinarySecondOperand(secondOperand: SecondOperand, totalBits: {magBits: number, frBits: number}): string {
    let binary = ''
    if(secondOperand.imm){
        binary += extendBinaryImmediate(secondOperand.imm, totalBits)
    }
    if(secondOperand.Fsrc2){
        binary += getBinaryFromRegisterNum(secondOperand.Fsrc2)
    }
    return binary.padEnd(totalBits.magBits+totalBits.frBits, 'X')
}

function extendBinaryImmediate(immediate: string, totalBits: {magBits: number, frBits: number}): string {
    if(immediate.includes('#')){    //direct immediate
        const imm = immediate.replace('#', '');
        const dec = parseFloat(imm);
        const bin = dec.toString(2);
        if(bin.includes('.')){
            const mag = bin.split('.')[0].padStart(totalBits.magBits, '0');
            const fra = bin.split('.')[1].padEnd(totalBits.frBits,'0');
            return `${mag}${fra}`
        }else{
            return bin.concat(concatFraction(totalBits.frBits)).padStart(totalBits.frBits+totalBits.magBits, '0')
        }
        
    }
    return 'Imm Error'
}
function concatFraction(frDigits: number, fillStr: string = '0'){
    let result = ''
    for(let i=0; i<frDigits; i++){
        result += fillStr
    }
    return result
}

function getBinaryFromRegisterNum(instrucUnit: string): string{
    console.log(instrucUnit)
    //p.ej.F1  -> '001'
    if(vectorRegisterMap.has(instrucUnit)){
        return vectorRegisterMap.get(instrucUnit) || 'NV'
    } 
        
    if(scalarRegisterMap.has(instrucUnit)) return scalarRegisterMap.get(instrucUnit) || 'NS'
    return '0000'       //case V
}

