import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { Client } from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Client> {
    return this.http.get<Client>(`${API_CONFIG.baseUrl}/client/${id}`);
  }

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${API_CONFIG.baseUrl}/client`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${API_CONFIG.baseUrl}/client`, client);
  }

  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${API_CONFIG.baseUrl}/client/${client.id}`, client);
  }

  delete(id: any): Observable<Client> {
    return this.http.delete<Client>(`${API_CONFIG.baseUrl}/client/${id}`);
  }
}
