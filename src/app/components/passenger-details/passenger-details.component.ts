import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ITrains } from '../../models/train.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { IStation } from '../../models/station.model';

interface Passenger {
  seat: string;
  name: string;
  surname: string;
  privateNumber: number;
}

@Component({
  selector: 'app-passenger-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss'],
})
export class PassengerDetailsComponent {
  @Input() trains: ITrains | null = null;
  @Input() station: IStation[] = [];
  passengers: Passenger[] = [];
  numberOfPassengers: number = 2; //stationNumber დან მინდა წამოიღოს :(
  // get numberOfPassengers(): number {
  //   return this.station.reduce(
  //     (acc, station) => acc + Number(station.stationNumber),
  //     0
  //   );
  // }

  constructor() {}

  ngOnInit(): void {
    this.passengers = Array(this.numberOfPassengers)
      .fill(null)
      .map(() => ({
        seat: '',
        name: '',
        surname: '',
        privateNumber: 0,
      }));
  }

  chooseSeat(index: number): void {
    alert(`Choosing seat for passenger ${index + 1}`);
  }

  submitForm(): void {
    console.log('Passenger details submitted:', this.passengers);
  }
}
