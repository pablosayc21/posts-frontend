import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay, retry, tap, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response.interface';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/paginated-response.interface';
@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  protected http = inject(HttpClient);
  protected baseUrl = environment.apiUrl;

  constructor() { }

  protected get<T>(url: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${url}`).pipe(
      delay(500),
      retry(1),
      tap(),
      catchError(error => throwError(() => error))
    );
  }

  protected post<T>(url: string, body: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}${url}`, body).pipe(
      delay(500),
      retry(1),
      tap(),
      catchError(error => throwError(() => error))
    );
  }

  protected put<T>(url: string, body: any): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}${url}`, body).pipe(
      delay(500),
      retry(1),
      tap(),
      catchError(error => throwError(() => error))
    );
  }

  protected delete<T>(url: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}${url}`).pipe(
      delay(500),
      retry(1),
      tap(),
      catchError(error => throwError(() => error))
    );
  }

  protected getList<T>(url: string, params?: HttpParams): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${url}`, { params }).pipe(
      delay(500),
      retry(1),
      tap(),
      catchError(error => throwError(() => error))
    );
  }

  protected getPaginated<T>(url: string, page: number,limit: number): Observable<ApiResponse<PaginatedResponse<T>>> {
    let httpParams = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http.get<ApiResponse<PaginatedResponse<T>>>(`${this.baseUrl}${url}/pg`, { params: httpParams, }).pipe(
      delay(500),
      retry(1),
      catchError(error => throwError(() => error))
    );
  }

}
