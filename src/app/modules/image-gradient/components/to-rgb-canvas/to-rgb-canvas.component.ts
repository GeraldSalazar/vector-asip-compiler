import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dataTransformToRBG } from '../shared/dataTransformToRGB';

@Component({
  selector: 'app-to-rgb-canvas',
  templateUrl: './to-rgb-canvas.component.html',
  styleUrls: ['./to-rgb-canvas.component.css']
})
export class ToRgbCanvasComponent {

  imageRGBresult: number[][] = [];
  constructor() { }
  setRGBDataToDisplay(RGBdata: number[][]){
    this.imageRGBresult = RGBdata;
  }


}
