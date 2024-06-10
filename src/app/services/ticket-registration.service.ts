import { Injectable } from '@angular/core';
import { IRegistration } from '../models/registration.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TicketRegistrationService {
  private apiUrl = 'https://railway.stepprojects.ge/api';

  constructor(private http: HttpClient) {}

  postTicketRegistration(
    registrationData: IRegistration
  ): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}/tickets/register`;
    console.log(url);
    return this.http.post(url, registrationData, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
