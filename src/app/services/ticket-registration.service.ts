import { Injectable } from '@angular/core';
import { IRegistration } from '../models/registration.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TicketRegistrationService {
  private apiUrl = 'https://railway.stepprojects.ge/api';

  constructor(private http: HttpClient) {}

  postTicketRegistration(
    registrationData: IRegistration
  ): Observable<IRegistration[]> {
    const url = `${this.apiUrl}/tickets/register`;
    console.log(url);
    return this.http.post<IRegistration[]>(url, registrationData);
  }
}
