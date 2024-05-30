import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartures } from '../models/departure.model';

@Injectable({
  providedIn: 'root',
})
export class DepartureService {
  private apiUrl = 'https://railway.stepprojects.ge/api';
  constructor(private http: HttpClient) {}

  getDepartures(
    from: string,
    to: string,
    date: string
  ): Observable<IDepartures[]> {
    const url = `${this.apiUrl}/departures?from=${encodeURIComponent(
      from
    )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
    return this.http.get<IDepartures[]>(url);
  }
}
