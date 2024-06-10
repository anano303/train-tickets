import { Component, Input, input } from '@angular/core';
import { ITickets } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentSuccessComponent } from '../payment/payment-success/payment-success.component';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../../shared/sharedDataService.service';
import { ITrains } from '../../models/train.model';

@Component({
  selector: 'app-cancel-ticket',
  standalone: true,
  imports: [CommonModule, PaymentSuccessComponent, FormsModule],
  templateUrl: './cancel-ticket.component.html',
  styleUrl: './cancel-ticket.component.scss',
})
export class CancelTicketComponent {
  response: any;
  ticketId: string = '';
  ticket: ITickets | null = null;
  errorMessage: string = '';
  paymentDate: Date | null = null;
  paymentSuccessData: any;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.response = navigation.extras.state['response'];
    }
  }

  ngOnInit(): void {
    this.paymentSuccessData = this.sharedDataService.paymentSuccessData;
    console.log(this.paymentSuccessData);
  }
  // Inside the searchTicket() method in CancelTicketComponent
  searchTicket() {
    this.ticketService.getTicketById(this.ticketId).subscribe(
      (ticket: ITickets) => {
        this.ticket = ticket;
      },
      (error) => {
        this.ticket = null;
        this.errorMessage =
          'ბილეთი არ მოიძებნა, გთხოვთ შეამოწმოთ ბილეთის ნომერი';
        console.error('Error fetching ticket:', error);
      }
    );
  }

  // navigateToPaymentSuccess() {
  //   if (this.ticket) {
  //     this.router.navigate(['/payment-success']);
  //   }
  // }
}
