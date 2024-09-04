import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const isAuthenticate = inject(AuthService).isAuthenticated();
  let token: string;
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  } else {
  }
  
  if (isAuthenticate) {
    const cloneReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    return next(cloneReq);
  }
  return next(req);
};