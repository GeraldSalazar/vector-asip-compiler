import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageGradientRoutingModule } from './image-gradient-routing.module';
import { ImageGradientComponent } from './image-gradient.component';


@NgModule({
  declarations: [
    ImageGradientComponent
  ],
  imports: [
    CommonModule,
    ImageGradientRoutingModule
  ]
})
export class ImageGradientModule { }
