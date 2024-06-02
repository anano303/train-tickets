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
import { PassengerDetailsComponent } from '../../components/passenger-details/passenger-details.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TicketRegistrationService } from '../../services/ticket-registration.service';
import { response } from 'express';
import { IRegistration } from '../../models/registration.model';
import { TrainSelectionService } from '../../shared/trainSelectionService.service';

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
  passengerForm!: FormGroup;
  showPaymentForm: boolean = true;
  paymentForm: FormGroup;
  totalPrice!: number; // Example total price, you can pass this as an @Input() from the parent component
  selectedTrain: ITrains | undefined;
  // @Input() selectedTrain!: ITrains;
  @Input() numberOfPassengers!: number; // Define numberOfPassengers
  paymentSuccess: boolean = false; // or false, depending on your logic
  paymentDate: any;
  passengerData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ticketRegistrationService: TicketRegistrationService,
    private trainSelectionService: TrainSelectionService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.totalPrice = state['totalPrice'] || 0; // Use bracket notation to access totalPrice
      this.passengerData = state['passengerForm'] || {};
      this.selectedTrain = state['selectedTrain'];
      console.log('Selected Train in Payment:', this.selectedTrain);
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
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      if (this.selectedTrain) {
        // Check if selectedTrain is defined
        const paymentData = this.paymentForm.value;
        this.showPaymentForm = false;
        this.paymentDate = new Date();
        this.paymentSuccess = true;

        const registrationData: IRegistration = {
          trainId: this.selectedTrain.id,
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
            },
            (error) => {
              console.error('Error registering tickets:', error);
            }
          );
        alert('Payment processed successfully!');
      } else {
        alert('Please fill out the form correctly.');
      }
    }
  }
}
