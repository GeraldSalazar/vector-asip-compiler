import { Component, OnInit } from '@angular/core';
import { binaryResult } from '../../services/compilation/to-binary/binary-translation';

@Component({
  selector: 'app-binary-result',
  templateUrl: './binary-result.component.html',
  styleUrls: ['./binary-result.component.css']
})
export class BinaryResultComponent implements OnInit {

  constructor() { }
  binaryInstucsResult = binaryResult;

  ngOnInit(): void {
  }

}
