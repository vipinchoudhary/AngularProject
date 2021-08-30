import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }

  getLoginUserPost(id: number): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.url + 'posts?userId=' + id)
  }

  getPostforOtherUsers(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.url + 'posts');
  }
  
}
