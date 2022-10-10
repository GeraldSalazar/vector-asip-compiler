import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html',
  styleUrls: ['./image-result.component.css']
})
export class ImageResultComponent implements OnInit {

  constructor() { }
  imageWidth: number = 200;
  imageHeight: number = 150;
  ngOnInit(): void {
  }

}
