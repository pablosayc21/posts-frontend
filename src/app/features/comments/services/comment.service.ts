import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../core/services/base-api.service';
import { Observable, switchMap, throwError, catchError, tap, map } from 'rxjs';
import { PostComment } from '../models/comment.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseApiService {
  prefix: string = '/comments'
  constructor() {
    super();
  }

  getByPostId(postId: string): Observable<PostComment[]> {
    const params = new HttpParams().set('postId', postId);
    return this.getList<PostComment[]>(this.prefix, params).pipe(
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
  
  createPost(post: PostComment): Observable<PostComment> {
    return this.post<PostComment>(this.prefix, post).pipe(
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

  deleteComment(postId: string): Observable<void> {
      return this.delete<PostComment>(`${this.prefix}/${postId}`).pipe(
        map(res => {
          if (!res.success) {
            throw res.message;
          }
          return;
        }),
        tap(),
        catchError(err => throwError(() => err))
      );
    }
  


}
