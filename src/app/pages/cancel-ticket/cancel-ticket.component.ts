import { Component, Input } from '@angular/core';
import { ITickets } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentSuccessComponent } from '../payment/payment-success/payment-success.component';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../../shared/sharedDataService.service';
import { ITrains } from '../../models/train.model';
import { TrainSelectionService } from '../../shared/trainSelectionService.service';

@Component({
  selector: 'app-cancel-ticket',
  standalone: true,
  imports: [CommonModule, PaymentSuccessComponent, FormsModule, RouterOutlet],
  templateUrl: './cancel-ticket.component.html',
  styleUrls: ['./cancel-ticket.component.scss'],
})
export class CancelTicketComponent {
  response: any;
  ticketId: string = '';
  ticket: ITickets | null = null;
  errorMessage: string = '';
  paymentDate: Date | null = null;
  paymentSuccessData: any;
  selectedTrain: ITrains | null = null;
  passengerData: any = {};
  cardOwner: string = '';
  totalPrice!: number;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private trainSelectionService: TrainSelectionService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.paymentSuccessData = state['paymentSuccessData'];
      this.ticketId = state['ticketId'] || null;
      this.selectedTrain = state['selectedTrain'];
      this.response = state['response'];
      this.paymentDate = state['paymentDate'];
      this.passengerData = state['passengerData'];
      this.cardOwner = state['cardOwner'];
      this.totalPrice = state['totalPrice'];
    } else {
      // Retrieve data from SharedDataService if no state is passed
      this.paymentSuccessData = this.sharedDataService.getPaymentSuccessData();
      this.selectedTrain = this.paymentSuccessData.selectedTrain;
      this.paymentDate = this.paymentSuccessData.paymentDate;
      this.passengerData = this.paymentSuccessData.passengerData;
      this.cardOwner = this.paymentSuccessData.cardOwner;
      this.totalPrice = this.paymentSuccessData.totalPrice;
    }
  }
  ngOnInit(): void {
    if (!this.paymentSuccessData) {
      this.paymentSuccessData = this.sharedDataService.getPaymentSuccessData();
      this.selectedTrain = this.paymentSuccessData.selectedTrain;
      this.paymentDate = this.paymentSuccessData.paymentDate;
      this.passengerData = this.paymentSuccessData.passengerData;
      this.cardOwner = this.paymentSuccessData.cardOwner;
      this.totalPrice = this.paymentSuccessData.totalPrice;
    }
  }

  searchTicket() {
    if (!this.ticketId.trim()) {
      this.errorMessage = 'გთხოვთ შეიყვანოთ ბილეთის ნომერი';
      return;
    }
    this.ticketService.getTicketById(this.ticketId).subscribe(
      (ticket: ITickets) => {
        this.ticket = ticket;
        this.errorMessage = '';
        this.paymentSuccessData = {
          ...this.paymentSuccessData,
          ticketId: ticket.id,
          tickets: [ticket],
          selectedTrain: this.selectedTrain,
          passengerData: this.passengerData,
          cardOwner: this.cardOwner,
          totalPrice: this.totalPrice,
          paymentDate: this.paymentDate,
        };
        console.log('cancelTicket data', this.paymentSuccessData);
      },
      (error) => {
        this.ticket = null;
        this.errorMessage =
          'ბილეთი არ მოიძებნა, გთხოვთ შეამოწმოთ ბილეთის ნომერი';
        console.error('Error fetching ticket:', error);
      }
    );
  }
}
