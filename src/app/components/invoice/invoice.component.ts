import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ISeat } from '../../models/seats.model';
import { ITrains } from '../../models/train.model';

type SeatClass = 'first' | 'second' | 'third';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  @Input() passengerForm!: FormGroup;
  @Input() submitForm!: () => void;
  @Output() formSubmit: EventEmitter<number> = new EventEmitter<number>();
  @Input() seat!: ISeat;
  selectedTrain: ITrains | null = null;
  totalPrice: number = 0;
  prices: number = 0;

  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.invoiceForm = this.fb.group({
      terms: [false, Validators.requiredTrue],
    });
    const navigation = this.router.getCurrentNavigation()?.extras.state;
    if (navigation) {
      this.selectedTrain = navigation['train'];
      this.passengerForm = navigation['passengerForm'];
    }
  }

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

      this.totalPrice += this.seat.price || 0;
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
    return this.seat?.price || 0;
  }

  get passengers(): FormArray {
    return this.passengerForm.get('passengers') as FormArray;
  }

  submitInvoice() {
    if (this.invoiceForm.valid) {
      this.formSubmit.emit(this.totalPrice);
      this.router.navigate(['/payment'], {
        state: {
          totalPrice: this.totalPrice,
          passengerForm: this.passengerForm.value,
          train: this.selectedTrain,
        },
      });
    } else {
      alert('Please accept the terms and conditions.');
    }
  }
}
