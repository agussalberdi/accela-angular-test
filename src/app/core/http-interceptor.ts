import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

/**
 * @desc The HTTP Interceptor is a service that will intercept all the HTTP requests passing through the app.
 */
@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

    /**
     * @desc This method allow us to catch errors and handle them before passing along.
     * Thanks to the retry() operator all http requests will be retried once before failing.
     */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
        retry(1),
        catchError((error) => {
        console.error(error);
        return throwError(error.message);
        })
    );
  }
}
