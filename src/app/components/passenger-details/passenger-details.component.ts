import { Component, Input, OnInit } from '@angular/core';
import { ITrains } from '../../models/train.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { SeatsService } from '../../services/seats.service';
import { ISeat } from '../../models/seats.model';

@Component({
  selector: 'app-passenger-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss'],
})
export class PassengerDetailsComponent {
  @Input() train: ITrains | null = null;
  numberOfPassengers: number = 1;

  passengerForm: FormGroup;
  showModal: boolean = false;
  showSeats: boolean = false;
  selectedPassengerIndex: number | null = null;
  seats: ISeat[] = [];
  classType: string = '';

  constructor(
    private fb: FormBuilder,
    private seatsService: SeatsService,
    private route: ActivatedRoute
  ) {
    this.passengerForm = this.fb.group({
      passengers: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const state = history.state as { numberOfPassengers: number };
    this.numberOfPassengers = state.numberOfPassengers;
    this.initPassengers();
  }

  get passengers(): FormArray {
    return this.passengerForm.get('passengers') as FormArray;
  }

  initPassengers(): void {
    for (let i = 0; i < this.numberOfPassengers; i++) {
      this.passengers.push(this.createPassengerGroup());
    }
  }

  createPassengerGroup(): FormGroup {
    return this.fb.group({
      seat: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      privateNumber: ['', Validators.required],
    });
  }

  chooseSeat(index: number): void {
    this.selectedPassengerIndex = index;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.showSeats = false;
  }

  selectClass(classType: string): void {
    this.classType = classType;
    this.seatsService.getSeatsForClass(classType).subscribe(
      (seats) => {
        this.seats = seats;
        this.showSeats = true;
      },
      (error) => {
        console.error('Error fetching seats:', error);
      }
    );
  }

  selectSeat(seat: ISeat): void {
    if (!seat.isOccupied && this.selectedPassengerIndex !== null) {
      this.passengers
        .at(this.selectedPassengerIndex)
        .get('seat')
        ?.setValue(seat.number);
      this.showSeats = false;
    } else {
      alert('This seat is occupied. Please choose another seat.');
    }
  }

  submitForm(): void {
    if (this.passengerForm.valid) {
      console.log(
        'Passenger details submitted:',
        this.passengerForm.value.passengers
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
