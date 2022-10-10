import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RgbDataService } from '../../services/rgb-data.service';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html',
  styleUrls: ['./image-result.component.css']
})
export class ImageResultComponent implements OnInit {

  constructor(private rgbData: RgbDataService) { }
  imageWidth: number = 200;
  imageHeight: number = 150;
  resultImgBitMap?: Uint8ClampedArray;
  @ViewChild('resultImageCanvas') resultImageCanvas!: ElementRef;
  ngOnInit(): void {
    this.rgbData.resultImgBitMap.subscribe((imgBitMap: Uint8ClampedArray) =>{
      this.resultImgBitMap = imgBitMap
      this.displayResultImage()
    })
  }

  displayResultImage(){
    if(this.resultImageCanvas.nativeElement.getContext){
      const context = (this.resultImageCanvas.nativeElement as HTMLCanvasElement).getContext('2d', {willReadFrequently: true})
      var imgdata = new ImageData(this.resultImgBitMap!, this.imageWidth, this.imageHeight);
      context!.putImageData(imgdata, 0, 0);   // set x and y
    }

  }
  // finally create a ImageData object using the typed array:

}
