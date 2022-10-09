import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-btns',
  templateUrl: './control-btns.component.html',
  styleUrls: ['./control-btns.component.css']
})
export class ControlBtnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  compileCode(){
    console.log('Compiling...')
  }
  generateFile(){
    console.log('Generating file...')
  }

}
