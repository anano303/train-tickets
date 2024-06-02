import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITickets } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'https://railway.stepprojects.ge/api';
  constructor(private http: HttpClient) {}

  getTickets(): Observable<ITickets[]> {
    const url = `${this.apiUrl}/tickets`;
    console.log(url);
    return this.http.get<ITickets[]>(url);
  }
}
