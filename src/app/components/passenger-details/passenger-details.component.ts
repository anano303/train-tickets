import { Component, Input, OnInit } from '@angular/core';
import { ITrains } from '../../models/train.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SeatsService } from '../../services/seats.service';
import { ISeat } from '../../models/seats.model';

interface Passenger {
  seat: string;
  name: string;
  surname: string;
  privateNumber: string;
}

@Component({
  selector: 'app-passenger-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss'],
})
export class PassengerDetailsComponent implements OnInit {
  @Input() train: ITrains | null = null;
  @Input() numberOfPassengers: number = 2;
  passengers: Passenger[] = [];
  showModal: boolean = false;
  showSeats: boolean = false;
  selectedPassengerIndex: number | null = null;
  seats: ISeat[] = [];
  classType: string = '';

  constructor(private seatsService: SeatsService) {}

  ngOnInit(): void {
    this.passengers = Array(this.numberOfPassengers)
      .fill(null)
      .map(() => ({
        seat: '',
        name: '',
        surname: '',
        privateNumber: '',
      }));
  }

  chooseSeat(index: number): void {
    this.selectedPassengerIndex = index;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.showSeats = false; // Close the seats modal when closing the class selection modal
  }

  selectClass(classType: string): void {
    this.classType = classType;
    this.seatsService.getSeatsForClass(classType).subscribe(
      (seat) => {
        this.seats = seat;
        this.showSeats = true;
      },
      (error) => {
        console.error('Error fetching seats:', error);
      }
    );
  }

  selectSeat(seat: ISeat): void {
    if (!seat.isOccupied && this.selectedPassengerIndex !== null) {
      this.passengers[this.selectedPassengerIndex].seat = seat.number;
      this.showSeats = false;
    } else {
      alert('This seat is occupied. Please choose another seat.');
    }
  }

  submitForm(): void {
    console.log('Passenger details submitted:', this.passengers);
  }
}
