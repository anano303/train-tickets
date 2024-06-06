import { Component, Input, OnInit } from '@angular/core';
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
import { TrainSelectionService } from '../../shared/trainSelectionService.service';

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
  minDate: any;

  constructor(
    private router: Router,
    private departureService: DepartureService,
    private trainSelectionService: TrainSelectionService
  ) {}
  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Set minDate to today's date
  }

  Departures(): void {
    const selectedDate = new Date(this.trainsData.date);
    const today = new Date();

    if (selectedDate < today) {
      alert('Please select a valid date.');
      return;
    }

    if (this.trainsData.from && this.trainsData.to && this.trainsData.date) {
      this.departureService
        .getDepartures(
          this.trainsData.from,
          this.trainsData.to,
          this.trainsData.date
        )
        .subscribe((data) => {
          this.departureData = data;
          this.router.navigate(['/trains'], {
            state: { ...this.trainsData },
          });
        });
      this.trainSelectionService.setTrainsData(this.trainsData);
      this.trainSelectionService.setFormattedDate(selectedDate);
    } else {
      alert('გთხოვთ შეავსოთ სრული ინფორმაცია');
    }
  }
}
