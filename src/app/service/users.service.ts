import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../models/users.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'https://jsonplaceholder.typicode.com/';
  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Users>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Users {
    return this.currentUserSubject.value;
}


  getUserByEmail(email: string): Observable<Users> {
    return this.http.get<Users>(this.url + 'users?email=' + email).pipe(
      map((data: Users) => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        return data;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
}
}
