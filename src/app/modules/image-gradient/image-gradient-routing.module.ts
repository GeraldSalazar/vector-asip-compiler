import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageGradientComponent } from './image-gradient.component';

const routes: Routes = [
  {path: '', component: ImageGradientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageGradientRoutingModule { }
