import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RgbDataService {

  rgbDataFromImage: number[][] = []
  rgbDataFromGradient: number[][] = []
  constructor() { }
  setRGBDataFromImg(newData: number[][]){
    this.rgbDataFromImage = newData
    console.log(this.rgbDataFromImage)
  }
  setRGBDataFromGrad(newData: number[][]){
    this.rgbDataFromGradient = newData
    console.log(this.rgbDataFromGradient)
  }
}
