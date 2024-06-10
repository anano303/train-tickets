import { Component } from '@angular/core';
import { ITickets } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentSuccessComponent } from '../payment/payment-success/payment-success.component';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.response = navigation.extras.state['response'];
    }
  }

  // ngOnInit(): void {
  //   // Access the ticket data from router's navigation extras
  //   // this.ticketId = this.route.snapshot.paramMap.get('ticketId') | '';
  // }
  // Inside the searchTicket() method in CancelTicketComponent
  searchTicket() {
    this.ticketService.getTicketById(this.ticketId).subscribe(
      (ticket: ITickets) => {
        this.ticket = ticket;
        // Check if ticket.date is not null before assigning
        if (ticket.date) {
          this.paymentDate = new Date(ticket.date);
        } else {
          this.paymentDate = null; // Assign null or handle it differently based on your requirements
        }
        this.errorMessage = '';
      },
      (error) => {
        this.ticket = null;
        this.errorMessage = 'Ticket not found';
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
