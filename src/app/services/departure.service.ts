import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStation } from '../models/station.model';

@Injectable({
  providedIn: 'root',
})
export class DepartureService {
  private apiUrl = 'https://railway.stepprojects.ge/api/';
  constructor(private http: HttpClient) {}

  getDepartures(): Observable<IStation[]> {
    const url = `${this.apiUrl}/departures`;
    console.log(url);
    return this.http.get<IStation[]>(url);
  }
}
