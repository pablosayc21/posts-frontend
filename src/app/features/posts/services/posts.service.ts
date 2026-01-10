import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError, tap, catchError } from 'rxjs';
import { Post } from '../models/post.interface';
import { BaseApiService } from '../../../core/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends BaseApiService {

  prefix: string = '/posts'
  constructor() {
    super();
  }

  getPosts(): Observable<Post[]> {
    return this.get<Post[]>(this.prefix).pipe(
      switchMap(res => {
        if (!res.success) {
          return throwError(() => res.message);
        }
        return [res.data ?? []];
      }),
      tap(),
      catchError(err => throwError(() => err))
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.post<Post>(this.prefix, post).pipe(
      switchMap(res => {
        if (!res.success) {
          return throwError(() => res.message);
        }
        return [res.data!];
      }),
      tap(),
      catchError(err => throwError(() => err))
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.get<Post>(`${this.prefix}/${id}`).pipe(
      switchMap(res => {
        if (!res.success || !res.data) {
          return throwError(() => res.message);
        }
        return [res.data];
      })
    );
  }

}
