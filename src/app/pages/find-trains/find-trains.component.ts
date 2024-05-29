import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartureService } from '../../services/departure.service';
import { IDepartures } from '../../models/departure.model';
import { CommonModule } from '@angular/common';
import { ITrains } from '../../models/train.model';

@Component({
  selector: 'app-find-trains',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './find-trains.component.html',
  styleUrl: './find-trains.component.scss',
})
export class FindTrainsComponent {
  trains: ITrains[] = [];

  constructor(private departureService: DepartureService) {}

  ngOnInit(): void {
    this.fetchDepartures('Station A', 'Station B', '2024-06-01');
  }

  fetchDepartures(from: string, to: string, date: string): void {
    this.departureService.getDepartures(from, to, date).subscribe(
      (data: IDepartures[]) => {
        this.trains = []; // Clear existing trains array
        data.forEach((departure) => {
          // Push each train from the departure into the trains array
          this.trains.push(...departure.trains);
        });
      },
      (error) => {
        console.error('Error fetching departures', error);
      }
    );
  }

  bookTrain(train: ITrains): void {
    alert(`Booking train: ${train.name}`);
  }
}
