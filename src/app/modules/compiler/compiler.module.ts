import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompilerRoutingModule } from './compiler-routing.module';
import { CompilerComponent } from './compiler.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { BinaryResultComponent } from './components/binary-result/binary-result.component';
import { ControlBtnsComponent } from './components/control-btns/control-btns.component';


@NgModule({
  declarations: [
    CompilerComponent,
    TextEditorComponent,
    BinaryResultComponent,
    ControlBtnsComponent
  ],
  imports: [
    CommonModule,
    CompilerRoutingModule
  ]
})
export class CompilerModule { }
