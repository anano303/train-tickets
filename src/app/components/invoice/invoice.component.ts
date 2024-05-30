import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PassengerDetailsComponent } from '../passenger-details/passenger-details.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, PassengerDetailsComponent, ReactiveFormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  @Input() passengerForm: any;
  totalPrice: number = 0;
  prices = {
    first: 100,
    second: 70,
    third: 50,
  };

  constructor() {}

  ngOnInit() {
    this.calculateTotalPrice();
    this.passengerForm.valueChanges.subscribe(() => this.calculateTotalPrice());
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    const passengers = this.passengerForm.get('passengers') as FormArray;
    passengers.controls.forEach((passenger) => {
      const seat = passenger.get('seat')?.value;
      const seatClass = this.getSeatClass(seat);
      // this.totalPrice += this.prices[seatClass] || 0;
    });
  }

  getSeatClass(seat: string): string {
    if (seat.startsWith('1')) return 'first';
    if (seat.startsWith('2')) return 'second';
    return 'third';
  }
}
