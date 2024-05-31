import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PassengerDetailsComponent } from '../passenger-details/passenger-details.component';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
// import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { PassengerDetailsComponent } from '../passenger-details/passenger-details.component';
// import { ITickets } from '../../models/ticket.model';

type SeatClass = 'first' | 'second' | 'third';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, PassengerDetailsComponent, ReactiveFormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  @Input() passengerForm!: FormGroup;
  totalPrice: number = 0;
  prices: Record<SeatClass, number> = {
    first: 100,
    second: 70,
    third: 50,
  };

  constructor() {}

  ngOnInit() {
    this.calculateTotalPrice();
    this.passengerForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    const passengers = this.passengerForm.get('passengers') as FormArray;
    passengers.controls.forEach((passenger) => {
      const seat = passenger.get('seat')?.value;
      const seatClass = seat ? this.getSeatClass(seat) : 'third';
      this.totalPrice += this.prices[seatClass] || 0;
    });
  }

  getSeatClass(seat: string): SeatClass {
    if (seat.startsWith('1')) return 'first';
    if (seat.startsWith('2')) return 'second';
    return 'third';
  }

  getPassengerPrice(passenger: AbstractControl): number {
    const passengerFormGroup = passenger as FormGroup;

    const seat = passengerFormGroup.get('seat')?.value;
    const seatClass = seat ? this.getSeatClass(seat) : 'third';
    return this.prices[seatClass] || 0;
  }

  get passengers(): FormArray {
    return this.passengerForm.get('passengers') as FormArray;
  }
}
