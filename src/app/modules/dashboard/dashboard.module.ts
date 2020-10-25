import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/modules/material.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { NewPostDialogComponent } from './components/new-post-dialog/new-post-dialog.component';


@NgModule({
  declarations: [DashboardComponent, PostsComponent, PostComponent, NewPostDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
