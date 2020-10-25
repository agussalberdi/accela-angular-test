import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as Modules from './modules';
import * as Components from './components';

@NgModule({
  declarations: [Components.HeaderComponent, Components.FilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    Modules.MaterialModule
  ],
  exports: [
    Components.HeaderComponent,
    Components.FilterComponent
  ]
})
export class SharedModule { }
