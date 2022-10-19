export function dataTransformToRBG(data: number[]): number[][]{
    let rgbTuples: number[][] = [];
    let currentTuple: number[] = [];
    let alphaCh = 0;
    for(let i=0; i<data.length; i++){
      if(alphaCh == 3){
        rgbTuples.push(currentTuple)
        currentTuple = []
        alphaCh = 0;
        continue;
      }
      currentTuple.push(data[i])
      alphaCh++
    }
    return rgbTuples
  } 