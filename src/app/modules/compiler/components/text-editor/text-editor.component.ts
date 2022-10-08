import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  totalLines: Array<number> = [0];
  constructor(private renderer: Renderer2) { }
  @ViewChild('tEditor')
  textEditor!: ElementRef;
  @ViewChild('lineCount')
  lineCount!: ElementRef;

  ngOnInit(): void {
  }

  updateLineNum(text: string){
    const linesNum = text.split('\n').length
    this.totalLines = new Array(linesNum).fill(0);
  }

  catchScroll(event: Event){
    const scrollTop = (event.target as HTMLTextAreaElement).scrollTop
    this.renderer.setProperty(this.lineCount.nativeElement, 'scrollTop', scrollTop+'')
  }

}
