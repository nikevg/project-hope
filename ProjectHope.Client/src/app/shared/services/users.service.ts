import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Result } from '../models/result';
import { SignUp } from '../models/users/sign-up';
import { SignIn } from '../models/users/sign-in';

@Injectable()
export class UsersService {
  private _url = 'api/users';

  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private _token: string;

  get token(): string {
    if (this._token) {
      return this._token;
    }

    this._token = localStorage.getItem('token');

    return this._token;
  }

  set token(value: string) {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }

    this._token = value;
  }

  constructor(private http: HttpClient) {}

  check(email: string): Observable<boolean> {
    return this.http
      .get<Result<boolean>>(`${this._url}/check/${email}`)
      .pipe(map((res) => res.data));
  }

  signUp(data: SignUp): Observable<boolean> {
    return this.http
      .post<Result<string>>(`${this._url}/signup`, data, this._httpOptions)
      .pipe(
        tap((res) => (this.token = res.data)),
        map((res) => (res.count === 1 ? true : false))
      );
  }

  signIn(data: SignIn): Observable<boolean> {
    return this.http
      .post<Result<string>>(`${this._url}/signin`, data, this._httpOptions)
      .pipe(
        tap((res) => (this.token = res.data)),
        map((res) => (res.count === 1 ? true : false))
      );
  }

  signOut(): Observable<boolean> {
    if (!this.token) {
      return of(true);
    }

    this.token = null;

    return of(true);
  }
}
