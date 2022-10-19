export function multiplyVectorEscalar(vector: number[], escalar: number){
    const newVector = []
    for(const value of vector){
        newVector.push(Math.floor(value*escalar))
    }
    return newVector
}

export function addVectors(vector1: number[], vector2: number[]){
    const newVector = []
    for(let i=0; i<vector1.length; i++){
        newVector.push(vector1[i]+vector2[i])
    }
    return newVector
}

