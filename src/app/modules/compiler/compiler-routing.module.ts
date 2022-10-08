import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompilerComponent } from './compiler.component';

const routes: Routes = [
  {path: '', component: CompilerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompilerRoutingModule { }
