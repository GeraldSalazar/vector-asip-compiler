import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RgbDataService } from '../../services/rgb-data.service';

@Component({
  selector: 'app-alpha-compositing',
  templateUrl: './alpha-compositing.component.html',
  styleUrls: ['./alpha-compositing.component.css']
})
export class AlphaCompositingComponent {

  constructor(private rgbService: RgbDataService){}
  ngOnInit(): void {
  }

  setRGBDataImg(imgData: number[][]) {
    this.rgbService.setRGBDataFromImg(imgData)
  }

  startComposition(){
    this.rgbService.calculateComposition()
  }

}
