import { Component, OnInit, Input } from '@angular/core';
import { filter, mergeMap, takeWhile } from 'rxjs/operators';
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
  filteredPosts: Post[] = [];

  constructor(private usersService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    if (this.isUserPosts) {
      this.usersService.user.pipe(
        filter(user => user !== null),
        mergeMap(user => this.usersService.getUserPosts(user.id))
      ).subscribe(posts => {
        this.posts = posts;
        this.filteredPosts = posts;
      });
    } else {
      this.usersService.getAllPosts().subscribe(posts => {
        this.posts = posts;
        this.filteredPosts = posts;
      });
    }
  }

  createPost(): void {
    const dialogRef = this.dialog.open(NewPostDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().pipe(
      takeWhile(r => r),
      mergeMap(value => {
        return this.usersService.createPost(value);
      })
    ).subscribe((response) => {
      const post = {...response.id, ...response.post};
      this.filteredPosts.push(post);
    });
  }

  handleFilter(filteredData: Post[]): void {
    this.filteredPosts = filteredData;
  }
}
