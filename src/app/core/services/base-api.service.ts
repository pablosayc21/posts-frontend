import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, retry, tap, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response.interface';
@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  protected http = inject(HttpClient);
  protected baseUrl = 'http://127.0.0.1:3000'

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

}
