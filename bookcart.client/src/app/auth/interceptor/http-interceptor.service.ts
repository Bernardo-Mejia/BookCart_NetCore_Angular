import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headerToken = localStorage.getItem('authToken');
    if (headerToken) {
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${headerToken}`,
        },
      });
    }

    return next.handle(req);
  }
}
