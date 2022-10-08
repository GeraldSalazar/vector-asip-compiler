import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'compiler', loadChildren: () => import('./modules/compiler/compiler.module').then(m => m.CompilerModule)},
  {path: 'image-gradient', loadChildren: () => import('./modules/image-gradient/image-gradient.module').then(m => m.ImageGradientModule)},
  {path: '', redirectTo: 'image-gradient', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
