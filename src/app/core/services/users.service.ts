import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from './../../shared/interfaces/user.interface';

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

  getUserPosts(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/posts?userId=${userId}`);
  }

  getAllPosts(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/posts`);
  }

}
