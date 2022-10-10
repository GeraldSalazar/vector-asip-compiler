import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { addVectors, multiplyVectorEscalar } from '../images-composition/vector-ops';
@Injectable({
  providedIn: 'root'
})
export class RgbDataService {

  rgbDataFromImage: number[][] = []
  rgbDataFromGradient: number[][] = []
  resultRGB: number[][] = [];
  resultImgBitMap: Subject<Uint8ClampedArray> = new Subject<Uint8ClampedArray>;

  alpha: number = 0.5;
  constructor() {}
  setRGBDataFromImg(newData: number[][]){
    this.rgbDataFromImage = newData
    //console.log(this.rgbDataFromImage)
  }
  setRGBDataFromGrad(newData: number[][]){
    this.rgbDataFromGradient = newData
    //console.log(this.rgbDataFromGradient)
  }

  calculateComposition(){
    ///Need to apply algorithm to perform 2 images composition
    //Formulas:
    //    Rout = Rin1 * (1-a) + Rin2 * a
    //    Gout = Gin1 * (1-a) + Gin2 * a
    //    Bout = Bin1 * (1-a) + Bin2 * a
    this.resultRGB = []
    for(let i=0; i<this.rgbDataFromImage.length; i++){
      const RGB1 = multiplyVectorEscalar(this.rgbDataFromImage[i], (1-this.alpha))
      const RBG2 = multiplyVectorEscalar(this.rgbDataFromGradient[i], this.alpha)
      this.resultRGB.push(addVectors(RGB1, RBG2));    //
    }
    this.createImageBitMap()
  }

  createImageBitMap(): void{
    const dstBitmap = new Uint8ClampedArray(this.resultRGB.length * 4);
    let ptrDst = 0;             // source pointer
    this.resultRGB.forEach((RGBvector) => {
      dstBitmap[ptrDst++] = RGBvector[0]    //R
      dstBitmap[ptrDst++] = RGBvector[1]    //G
      dstBitmap[ptrDst++] = RGBvector[2]    //B
      dstBitmap[ptrDst++] = 255;             //a
    })

    this.resultImgBitMap.next(dstBitmap)
    
  }

}
