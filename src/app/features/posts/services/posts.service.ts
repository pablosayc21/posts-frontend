import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError, tap, catchError, map } from 'rxjs';
import { Post } from '../models/post.interface';
import { BaseApiService } from '../../../core/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends BaseApiService {

  readonly prefix = '/posts';

  constructor() {
    super();
  }

  getPosts(): Observable<Post[]> {
    return this.get<Post[]>(this.prefix).pipe(
      map(res => {
        if (!res.success) {
          throw res.message;
        }
        return res.data ?? [];
      })
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.post<Post>(this.prefix, post).pipe(
      map(res => {
        if (!res.success || !res.data) {
          throw res.message;
        }
        return res.data;
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.get<Post>(`${this.prefix}/${id}`).pipe(
      map(res => {
        if (!res.success || !res.data) {
          throw res.message;
        }
        return res.data;
      })
    );
  }

  deletePost(postId: string): Observable<void> {
    return this.delete<void>(`${this.prefix}/${postId}`).pipe(
      map(res => {
        if (!res.success) {
          throw res.message;
        }
        return;
      })
    );
  }

  updatePost(postId: string, payload: Post): Observable<Post> {
    const body = {
      title: payload.title,
      body: payload.body,
      author: payload.author,
    };

    return this.put<Post>(`${this.prefix}/${postId}`, body).pipe(
      map(res => {
        if (!res.success || !res.data) {
          throw res.message;
        }
        return res.data;
      })
    );
  }

}
