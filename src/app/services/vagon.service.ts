import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVagons } from '../models/vagon.module';

@Injectable({
  providedIn: 'root',
})
export class VagonService {
  private apiUrl = 'https://railway.stepprojects.ge/api/';
  constructor(private http: HttpClient) {}

  getVagons(): Observable<IVagons[]> {
    const url = `${this.apiUrl}/vagons`;
    console.log(url);
    return this.http.get<IVagons[]>(url);
  }
}
