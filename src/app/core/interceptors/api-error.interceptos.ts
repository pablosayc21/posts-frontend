import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            
            let message = 'Error no manejado';

            if (error.error?.message) {
                message = error.error.message;
            }

            return throwError(() => ({
                success: false,
                message,
                status: error.status,
            }));
        })
    );
};