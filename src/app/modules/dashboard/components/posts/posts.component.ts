import { Component, OnInit, Input } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { UsersService } from './../../../../core/services/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() isUserPosts: boolean;
  posts: any = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    if (this.isUserPosts) {
      this.usersService.user.pipe(
        mergeMap(user => this.usersService.getUserPosts(user.id))
      ).subscribe(posts => this.posts = posts);
    } else {
      // retrieve other posts
      this.usersService.getAllPosts().subscribe(posts => this.posts = posts);
    }
  }

}
