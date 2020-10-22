import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Services from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [Services.UsersService]
})
export class CoreModule { }
