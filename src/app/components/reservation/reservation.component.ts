import { Component, Input } from '@angular/core';
import { IStation } from '../../models/station.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartureService } from '../../services/departure.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonEngine } from '@angular/ssr';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,

    RouterOutlet,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent {
  @Input() stations: IStation[] = [];
  trainsData = {
    from: '',
    to: '',
    date: '',
    passengers: 1,
  };
  departureData: any;

  constructor(
    private router: Router,
    private departureService: DepartureService
  ) {}

  Departures(): void {
    if (this.trainsData.from && this.trainsData.to && this.trainsData.date) {
      this.departureService
        .getDepartures(
          this.trainsData.from,
          this.trainsData.to,
          this.trainsData.date
        )
        .subscribe((data) => {
          this.departureData = data;
          // Optionally navigate to another page or display data
          this.router.navigate(['/trains']);
        });
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }
}
