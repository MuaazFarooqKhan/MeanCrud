
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const postsUrl = 'http://localhost:3000/books'

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(postsUrl);
  }
}
