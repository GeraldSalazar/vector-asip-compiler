import { formatPercent } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CompilationService } from '../../services/compilation.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  keywords: string[] = this.compilationService.keywords;

  totalLines: Array<number> = [0];
  constructor(private renderer: Renderer2, private compilationService: CompilationService) { }
  @ViewChild('tEditor')
  textEditor!: ElementRef;
  @ViewChild('lineCount')
  lineCount!: ElementRef;

  ngOnInit(): void {
  }

  updateLineNum(text: string | null){
    if(text){
      const linesNum = text.split('\n').length
      this.totalLines = new Array(linesNum).fill(0);
    }
  }

  catchScroll(event: Event){
    const scrollTop = (event.target as HTMLTextAreaElement).scrollTop
    this.renderer.setProperty(this.lineCount.nativeElement, 'scrollTop', scrollTop+'')
  }

  //https://stackoverflow.com/questions/37139076/change-color-of-specific-words-in-textarea

  checkText(event: KeyboardEvent){
    const textEditor = this.textEditor.nativeElement as HTMLDivElement
    this.compilationService.setRawCode(textEditor.innerText)
    if(event.code == 'Space'){
      const formattedText = textEditor.innerText.replace(/[\s]+/g, " ").trim().split(" ");
      let newHTML = this.textToHTML(formattedText);
      this.renderer.setProperty(textEditor, 'innerHTML', newHTML)
      this.placeCaretAtEnd(textEditor)
    }

  }

  placeCaretAtEnd(el: HTMLDivElement) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel!.removeAllRanges();
        sel!.addRange(range);
    } 
}

  textToHTML(text: string[]): string{
    let html = ''
    for(let i=0; i<text.length; i++){
      let keywordIndex = this.keywords.indexOf(text[i].trim().toUpperCase())
      if (keywordIndex > -1) {
        html += "<span class='statement'>" + this.keywords[keywordIndex] + "&nbsp; </span>";
      } else {
        html += text[i]+ '&nbsp;'; 
      }
      if(text[i].includes(';')){
        html += '<br \>'
      }
    }
    return html
  }

}
