import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binary-result',
  templateUrl: './binary-result.component.html',
  styleUrls: ['./binary-result.component.css']
})
export class BinaryResultComponent implements OnInit {

  constructor() { }
  binaryInstucsResult = ['00001111110000', '00001111110000','00000111111000']

  ngOnInit(): void {
  }

}
