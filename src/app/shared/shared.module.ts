import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Modules from './modules';
import * as Components from './components';

@NgModule({
  declarations: [Components.HeaderComponent],
  imports: [
    CommonModule,
    Modules.MaterialModule
  ],
  exports: [
    Components.HeaderComponent
  ]
})
export class SharedModule { }
