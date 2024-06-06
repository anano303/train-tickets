import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ITrains } from '../../models/train.model';
import { PassengerDetailsComponent } from '../passenger-details/passenger-details.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TicketRegistrationService } from '../../services/ticket-registration.service';
import { response } from 'express';
import { IRegistration } from '../../models/registration.model';
import { TrainSelectionService } from '../../shared/trainSelectionService.service';
import { IVagon } from '../../models/vagon.model';
import { TicketService } from '../../services/ticket.service';
import { ITickets } from '../../models/ticket.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PassengerDetailsComponent,
    PaymentSuccessComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  @Input() trains: ITrains[] = [];
  @Input() numberOfPassengers!: number;
  @Input() vagon: IVagon[] = [];

  passengerForm!: FormGroup;
  showPaymentForm: boolean = true;
  paymentForm: FormGroup;
  totalPrice!: number;
  selectedTrain: ITrains | null = null;

  paymentSuccess: boolean = false;
  paymentDate: any;
  passengerData: any;
  firstTicketDate: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ticketService: TicketService,
    private ticketRegistrationService: TicketRegistrationService,
    private trainSelectionService: TrainSelectionService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.totalPrice = state['totalPrice'] || 0; // Use bracket notation to access totalPrice
      this.passengerData = state['passengerForm'] || {};
      this.selectedTrain = state['train'] || null;
      console.log('Selected Train in Payment:', this.selectedTrain);
      console.log('State:', state);
    }

    this.paymentForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})$'),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      cardOwner: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.selectedTrain = this.trainSelectionService.getSelectedTrain();
    console.log('Selected Train in Payment:', this.selectedTrain);
    if (typeof localStorage !== 'undefined') {
      const savedPaymentForm = localStorage.getItem('paymentForm');
      const savedTotalPrice = localStorage.getItem('totalPrice');
      const savedPassengerData = localStorage.getItem('passengerData');

      if (savedPaymentForm) {
        this.paymentForm.setValue(JSON.parse(savedPaymentForm));
      }
      if (savedTotalPrice) {
        this.totalPrice = JSON.parse(savedTotalPrice);
      }
      if (savedPassengerData) {
        this.passengerData = JSON.parse(savedPassengerData);
      }
    }
    this.ticketService.getTickets().subscribe((tickets: ITickets[]) => {
      if (tickets.length > 0 && tickets[0].date) {
        this.firstTicketDate = tickets[0].date;
      }
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      this.showPaymentForm = false;
      this.paymentDate = new Date();
      this.paymentSuccess = true;

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('paymentForm', JSON.stringify(paymentData));
        localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
        localStorage.setItem(
          'passengerData',
          JSON.stringify(this.passengerData)
        );
      }

      const registrationData: IRegistration = {
        trainId: this.selectedTrain ? this.selectedTrain.id : 0, // Remove or handle trainId if needed
        date: new Date().toISOString(),
        email: this.passengerData.email,
        phoneNumber: this.passengerData.phone,
        people: this.passengerData.passengers,
      };

      this.ticketRegistrationService
        .postTicketRegistration(registrationData)
        .subscribe(
          (response) => {
            console.log('Tickets registered successfully:', response);
            this.router.navigate(['/payment-success'], {
              state: {
                response,
                paymentDate: this.paymentDate,
                passengerData: this.passengerData,
                cardOwner: paymentData.cardOwner,
                totalPrice: this.totalPrice,
                selectedTrain: this.selectedTrain, // Remove if not needed
              },
            });
          },
          (error) => {
            console.error('Error registering tickets:', error);
          }
        );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
