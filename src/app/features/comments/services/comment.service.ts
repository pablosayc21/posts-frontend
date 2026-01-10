import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../core/services/base-api.service';
import { Observable, switchMap, throwError, catchError } from 'rxjs';
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
      catchError(err => throwError(() => err))
    );
  }

}
