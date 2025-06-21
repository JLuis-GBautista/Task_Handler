import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, throwError, BehaviorSubject, from } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Omitir si es llamada al endpoint de refresh
    if (req.url.includes('/auth/refresh')) {
      return next.handle(req);
    }
    console.log("interceptor");
    const accessToken = this.authService.accessToken();
    let authReq = req;

    if (accessToken) {
      authReq = this.addAuthHeader(req, accessToken);
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addAuthHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    // Convierte la Promise en Observable con from()
    return from(this.authService.refresh()).pipe(
      switchMap(({ accessToken }) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(accessToken);
        return next.handle(this.addAuthHeader(req, accessToken));
      }),
      catchError(err => {
        this.isRefreshing = false;
        this.authService.clearSession();
        return throwError(() => err);
      })
    );
  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => !!token),
      take(1),
      switchMap(token => next.handle(this.addAuthHeader(req, token!)))
    );
  }
}
}