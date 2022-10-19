import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { dataTransformToRBG } from '../shared/dataTransformToRGB';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})
export class ImageCanvasComponent implements OnInit {

  constructor() { }
  imageWidth: number = 200;
  imageHeight: number = 150;
  imageRGBAresult: number[] = [];    //red, green, blue, alpha
  imageRGBresult: number[][] = [];
  @ViewChild('imageCanvas')
  canvas!: ElementRef;

  @Output() rgbResult = new EventEmitter<number[][]>();

  
  ngAfterViewInit(){
    const canvasEl = this.canvas.nativeElement
    const context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d')
    this.centerImageOnCanvas(canvasEl, context!)
    
  }

  async centerImageOnCanvas(canvasEl: HTMLCanvasElement, context: CanvasRenderingContext2D){
    const image: HTMLImageElement = await this.loadImage('assets/image.jpg');
    context?.drawImage(image, 0, 0);
    var imgd = context.getImageData(0, 0, this.imageWidth, this.imageHeight);
    this.imageRGBAresult = [...imgd.data];
    this.imageRGBresult = dataTransformToRBG(this.imageRGBAresult)
    this.rgbResult.emit(this.imageRGBresult);
  }
  ngOnInit(): void {
  }

  
  async loadImage(src: string): Promise<HTMLImageElement> {
    const image = new Image();
    image.src = src;
    return new Promise(resolve => {
        image.onload = (ev) => {
            resolve(image);
        }
    });
  }

}
