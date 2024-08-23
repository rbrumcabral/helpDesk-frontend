import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Technician } from '../models/technician';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private http: HttpClient){ }

  findAll(): Observable<Technician[]> {
    return this.http.get<Technician[]>(`${API_CONFIG.baseUrl}/technician`);
  }
}
