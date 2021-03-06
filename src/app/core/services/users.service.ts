import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User, Post } from '@shared/interfaces/index';

/**
 * @desc This service allow us to retrieve data from an external API and realize the login process.
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) { }

  get user(): BehaviorSubject<User | null> {
    return this.user$;
  }

  /**
   * @desc Method for retrieving all the users from the api.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}/users`);
  }

  /**
   * @desc Method for retrieve a single user from the api.
   * @param email: string
   */
  getUser(email: string): Observable<User> {
    return this.http.get<User[]>(`${environment.api_url}/users?email=${email}`)
      .pipe(
        map(value => value[0])
      );
  }

  /**
   * @desc Method for Login the user.
   * @param data: User
   */
  login(data: User): void {
    this.user.next(data);
  }

  /**
   * @desc Method for logout the user within the app.
   */
  logout(): void {
    this.user.next(null);
    this.router.navigate(['login']);
  }

  /**
   * @desc Method for retrieving user posts from the api.
   * @param userId: number
   */
  getUserPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api_url}/posts?userId=${userId}`);
  }

  /**
   * @desc Method for retrieving all the posts from the api.
   */
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api_url}/posts`);
  }

  /**
   * @desc Method for creating a new Post.
   */
  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/posts`, {post});
  }

}
