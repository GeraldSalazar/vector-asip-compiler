import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlphaCompositingComponent } from './components/alpha-compositing/alpha-compositing.component';
import { ImageGradientComponent } from './image-gradient.component';

const routes: Routes = [
  {path: '', component: ImageGradientComponent},
  {path: 'alpha-compositing', component: AlphaCompositingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageGradientRoutingModule { }
