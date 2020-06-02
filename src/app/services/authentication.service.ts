import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserResponse } from '../model/user-response';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<UserResponse>;
  public user: Observable<UserResponse>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<UserResponse>(JSON.parse(localStorage.getItem('userMe')));
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserResponse {
      return this.userSubject.value;
  }

  login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/login`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('userMe', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('userMe');
      this.userSubject.next(null);
      this.router.navigate(['/login']);
  }
}
