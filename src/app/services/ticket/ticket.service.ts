import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { Ticket } from '../../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Ticket> {
    return this.http.get<Ticket>(`${API_CONFIG.baseUrl}/ticket/${id}`);
  }

  findAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${API_CONFIG.baseUrl}/ticket`);
  }

  create(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${API_CONFIG.baseUrl}/ticket`, ticket);
  }

  update(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${API_CONFIG.baseUrl}/ticket/${ticket.id}`, ticket);
  }

  delete(id: any): Observable<Ticket> {
    return this.http.delete<Ticket>(`${API_CONFIG.baseUrl}/ticket/${id}`);
  }
}
