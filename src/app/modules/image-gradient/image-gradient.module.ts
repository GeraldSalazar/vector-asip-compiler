import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageGradientRoutingModule } from './image-gradient-routing.module';
import { ImageGradientComponent } from './image-gradient.component';
import { ToRgbCanvasComponent } from './components/to-rgb-canvas/to-rgb-canvas.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AlphaCompositingComponent } from './components/alpha-compositing/alpha-compositing.component';
import { LinearGradientComponent } from './components/linear-gradient/linear-gradient.component';
import { ImageCanvasComponent } from './components/image-canvas/image-canvas.component';

@NgModule({
  declarations: [
    ImageGradientComponent,
    ToRgbCanvasComponent,
    AlphaCompositingComponent,
    LinearGradientComponent,
    ImageCanvasComponent
  ],
  imports: [
    CommonModule,
    ImageGradientRoutingModule,
    ScrollingModule
  ]
})
export class ImageGradientModule { }
