import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../shared/modules/material.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from './../../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';


@NgModule({
  declarations: [DashboardComponent, PostsComponent, PostComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
