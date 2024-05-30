import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ITrains } from '../../models/train.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';

interface Passenger {
  seat: string;
  name: string;
  surname: string;
  pirateNumber: string;
}

@Component({
  selector: 'app-passenger-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss'],
})
export class PassengerDetailsComponent {
  @Input() train: ITrains | null = null;
  @Input() numberOfPassengers: number = 1;
  passengers: Passenger[] = [];

  constructor() {}

  ngOnInit(): void {
    this.passengers = Array(this.numberOfPassengers)
      .fill(null)
      .map(() => ({
        seat: '',
        name: '',
        surname: '',
        pirateNumber: '',
      }));
  }

  chooseSeat(index: number): void {
    alert(`Choosing seat for passenger ${index + 1}`);
  }

  submitForm(): void {
    console.log('Passenger details submitted:', this.passengers);
  }
}
