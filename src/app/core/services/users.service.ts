import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, Post } from './../../shared/interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

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
        map(value => value[0]),
        catchError(err => of(err))
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

  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/posts`, {post});
  }

}
