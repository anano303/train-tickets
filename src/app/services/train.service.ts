import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITrains } from '../models/train.model';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private apiUrl = 'https://railway.stepprojects.ge/api/';
  constructor(private http: HttpClient) {}

  getTrains(): Observable<ITrains[]> {
    const url = `${this.apiUrl}/trains`;
    console.log(url);
    return this.http.get<ITrains[]>(url);
  }
}
