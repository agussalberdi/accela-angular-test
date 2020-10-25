import { Component, OnInit, Input } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '@core/services/users.service';
import { Post } from '@shared/interfaces/post.interface';
import { NewPostDialogComponent } from './../new-post-dialog/new-post-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() isUserPosts: boolean;
  posts: Post[] = [];

  constructor(private usersService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    if (this.isUserPosts) {
      this.usersService.user.pipe(
        mergeMap(user => this.usersService.getUserPosts(user.id))
      ).subscribe(posts => this.posts = posts);
    } else {
      this.usersService.getAllPosts().subscribe(posts => this.posts = posts);
    }
  }

  createPost(): void {
    const dialogRef = this.dialog.open(NewPostDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().pipe(
      mergeMap(value => this.usersService.createPost(value))
    ).subscribe((response) => {
      const post = {...response.post, ...response.id};
      this.posts.push(post);
      console.log(this.posts);
    });
  }

}
