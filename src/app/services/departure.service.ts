import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartures } from '../models/departure.model';

@Injectable({
  providedIn: 'root',
})
export class DepartureService {
  private apiUrl = 'https://railway.stepprojects.ge/api/';
  constructor(private http: HttpClient) {}

  getDepartures(): Observable<IDepartures[]> {
    const url = `${this.apiUrl}/departures`;
    console.log(url);
    return this.http.get<IDepartures[]>(url);
  }
}
