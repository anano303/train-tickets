import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
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

  getTicketById(ticketId: string): Observable<ITickets> {
    const url = `${this.apiUrl}/tickets/checkstatus/${ticketId}`;
    return this.http.get<ITickets>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching ticket:', error);
        return throwError(error);
      })
    );
  }

  cancelTicket(ticketId: string): Observable<any> {
    const url = `${this.apiUrl}/tickets/cancel/${ticketId}`;
    return this.http
      .delete(url, { responseType: 'text', observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body;
          } else {
            throw new Error(`Unexpected response status: ${response.status}`);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error cancelling ticket:', error);
          return throwError(error);
        })
      );
  }
}
