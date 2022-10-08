import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompilerRoutingModule } from './compiler-routing.module';
import { CompilerComponent } from './compiler.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';


@NgModule({
  declarations: [
    CompilerComponent,
    TextEditorComponent
  ],
  imports: [
    CommonModule,
    CompilerRoutingModule
  ]
})
export class CompilerModule { }
