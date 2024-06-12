import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITrains } from '../../models/train.model';
import { PassengerDetailsComponent } from '../passenger-details/passenger-details.component';
import { TrainSelectionService } from '../../shared/trainSelectionService.service';
import { IVagon } from '../../models/vagon.model';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TicketService } from '../../services/ticket.service';
import { SharedDataService } from '../../shared/sharedDataService.service';

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
  @Input() paymentSuccessData: any = {
    selectedTrain: null,
    paymentDate: new Date(),
    passengerData: { email: '', phone: '', passengers: [] },
    cardOwner: '',
    totalPrice: 0,
    tickets: [],
  };

  passengerForm!: FormGroup;
  showPaymentForm: boolean = true;
  paymentForm: FormGroup;
  totalPrice!: number;
  selectedTrain: ITrains | null = null;

  paymentSuccess: boolean = false;
  paymentDate: any;
  passengerData: any;
  vagonId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private trainSelectionService: TrainSelectionService,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.totalPrice = state['totalPrice'] || 0; // Use bracket notation to access totalPrice
      this.passengerData = state['passengerForm'] || {};
      this.selectedTrain = state['train'] || null;
      this.paymentSuccessData = state['paymentSuccessData'];
      // const passengers: Passenger[] = state['passengerData'] || [];
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
    this.sharedDataService.setPaymentSuccessData(this.paymentSuccessData);
    // if (typeof localStorage !== 'undefined') {
    //   const savedPaymentForm = localStorage.getItem('paymentForm');
    //   const savedTotalPrice = localStorage.getItem('totalPrice');
    //   const savedPassengerData = localStorage.getItem('passengerData');

    //   if (savedPaymentForm) {
    //     this.paymentForm.setValue(JSON.parse(savedPaymentForm));
    //   }
    //   if (savedTotalPrice) {
    //     this.totalPrice = JSON.parse(savedTotalPrice);
    //   }
    //   if (savedPassengerData) {
    //     this.passengerData = JSON.parse(savedPassengerData);
    //   }
    // }
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      this.showPaymentForm = false;
      this.paymentDate = new Date();
      this.paymentSuccess = true;
      this.paymentSuccessData = true;
      // this.ticketService.getTicketById().subscribe(ticketId => {

      //   this.router.navigate(['/payment-success'], { state: { ticketId: ticketId } });
      // });

      // if (typeof localStorage !== 'undefined') {
      //   localStorage.setItem('paymentForm', JSON.stringify(paymentData));
      //   localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
      //   localStorage.setItem(
      //     'passengerData',
      //     JSON.stringify(this.passengerData)
      //   );
      // }
    }
  }
}
