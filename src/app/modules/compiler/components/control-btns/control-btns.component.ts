import { Component, OnInit } from '@angular/core';
import { CompilationService } from '../../services/compilation.service';

@Component({
  selector: 'app-control-btns',
  templateUrl: './control-btns.component.html',
  styleUrls: ['./control-btns.component.css']
})
export class ControlBtnsComponent implements OnInit {

  constructor(private compilationService: CompilationService) { }

  ngOnInit(): void {
  }
  compileCode(){
    console.log('Compiling...')
    this.compilationService.startCompilation();
  }
  generateFile(){
    console.log('Generating file...')
  }

}
