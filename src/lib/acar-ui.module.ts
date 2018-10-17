import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AcarUiComponent } from './acar-ui.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AcarUiComponent,
    CarouselComponent
  ],
  exports: [
    AcarUiComponent,
    CarouselComponent
  ]
})
export class AcarUiModule { }
