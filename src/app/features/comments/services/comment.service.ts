import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../core/services/base-api.service';
import { Observable, switchMap, throwError, catchError, tap, map } from 'rxjs';
import { PostComment } from '../models/comment.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseApiService {

  readonly prefix = '/comments'

  constructor() {
    super();
  }

  getByPostId(postId: string): Observable<PostComment[]> {
    const params = new HttpParams().set('postId', postId);
    return this.getList<PostComment[]>(this.prefix, params).pipe(
      map(res => {
        if (!res.success) {
          throw res.message;
        }
        return res.data ?? [];
      })
    );
  }

  createPost(comment: PostComment): Observable<PostComment> {
    return this.post<PostComment>(this.prefix, comment).pipe(
      map(res => {
        if (!res.success || !res.data) {
          throw res.message;
        }
        return res.data;
      })
    );
  }

  deleteComment(commentId: string): Observable<void> {
    return this.delete<void>(`${this.prefix}/${commentId}`).pipe(
      map(res => {
        if (!res.success) {
          throw res.message;
        }
        return;
      })
    );
  }


}
