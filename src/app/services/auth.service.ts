import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  authenticate(credenciais: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authToken: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', authToken);
    }
  }

  isAuthenticated() {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('token');
      if (token != null) {
        return !this.jwtService.isTokenExpired(token);
      }
    }
    return false;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
