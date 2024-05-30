import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISeat } from '../models/seats.model';

@Injectable({
  providedIn: 'root',
})
export class SeatsService {
  private apiUrl = 'https://railway.stepprojects.ge/api';
  constructor(private http: HttpClient) {}

  getSeatsForClass(classType: string): Observable<ISeat[]> {
    const url = `${this.apiUrl}/seat/{seatId}?class=${classType}`;
    return this.http.get<ISeat[]>(url);
  }
}
