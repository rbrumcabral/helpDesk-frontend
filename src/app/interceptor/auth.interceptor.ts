import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const isAuthenticate = inject(AuthService).isAuthenticated();
  let token = localStorage.getItem('token');
  if(isAuthenticate){
    const cloneReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    return next(cloneReq);
  } 
  return next(req);
};