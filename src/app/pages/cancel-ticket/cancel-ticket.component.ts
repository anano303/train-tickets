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
  paymentSuccessData: any; // Initialize to avoid undefined issues
  selectedTrain: ITrains | null = null;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private trainSelectionService: TrainSelectionService
  ) {}

  ngOnInit(): void {
    this.paymentSuccessData = this.sharedDataService.paymentSuccessData || {}; // Initialize with default object
    console.log(this.paymentSuccessData);
    this.selectedTrain = this.trainSelectionService.getSelectedTrain();
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
          tickets: [ticket], // Assuming the ticket service returns a single ticket object
          selectedTrain: this.selectedTrain,
          passengerData: {
            email: 'test@example.com',
            phone: '1234567890',
            passengers: ticket.persons || [], // Assuming `persons` is an array of passengers
          },
          cardOwner: 'Card Owner',
          totalPrice: 100,
          paymentDate: new Date(),
        };
        console.log('data', this.paymentSuccessData);
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
