import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RgbDataService } from '../../services/rgb-data.service';
import { dataTransformToRBG } from '../shared/dataTransformToRGB';

@Component({
  selector: 'app-linear-gradient',
  templateUrl: './linear-gradient.component.html',
  styleUrls: ['./linear-gradient.component.css']
})
export class LinearGradientComponent implements OnInit {

  imageWidth: number = 200;
  imageHeight: number = 150;

  gradientRGBData: number[][] = []
  @ViewChild('gradientCanvas') gradientResult!: ElementRef;
  constructor(private rgbService: RgbDataService) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  updateGradient(color1: any){
    var percentage1 = 0;
    var percentage2 = 100;
    var color2 = "#000";
    //this.gradientResult.nativeElement.style.background = `linear-gradient(to bottom, ${color1} ${percentage1}%, ${color2} ${percentage2}%)`;
    if(this.gradientResult.nativeElement.getContext){
      const context = (this.gradientResult.nativeElement as HTMLCanvasElement).getContext('2d', {willReadFrequently: true})
      const gradient = context!.createLinearGradient(0, 0, 0, this.imageHeight);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, "black");
      context!.fillStyle = gradient;
      context!.fillRect(0, 0, 200, 150);
      const imgRGBData = context!.getImageData(0, 0, this.imageWidth, this.imageHeight);
      this.gradientRGBData = dataTransformToRBG([...imgRGBData.data])
      console.log(`%c Linear Gradient RGB Data: `, `background: #000; color: ${color1}`)
      console.log(this.gradientRGBData)
      console.log(`%c ------------------------- `, `background: #000; color: ${color1}`)
      this.rgbService.setRGBDataFromGrad(this.gradientRGBData)
    }

  }

}
