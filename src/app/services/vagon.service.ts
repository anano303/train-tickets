import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStation } from '../models/station.model';

@Injectable({
  providedIn: 'root',
})
export class VagonService {
  private apiUrl = 'https://railway.stepprojects.ge/api/';
  constructor(private http: HttpClient) {}

  getVagons(): Observable<IStation[]> {
    const url = `${this.apiUrl}/vagons`;
    console.log(url);
    return this.http.get<IStation[]>(url);
  }
}
