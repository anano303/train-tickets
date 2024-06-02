import { Component, Input } from '@angular/core';
import { ITickets } from '../../../models/ticket.model';
import { PaymentComponent } from '../payment.component';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { TrainService } from '../../../services/train.service';
import { SeatsService } from '../../../services/seats.service';
import { VagonService } from '../../../services/vagon.service';
import { ISeat } from '../../../models/seats.model';
import { IVagon } from '../../../models/vagon.model';
import { ITrains } from '../../../models/train.model';
import { response } from 'express';
import { TicketRegistrationService } from '../../../services/ticket-registration.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [PaymentComponent, CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent {
  @Input() paymentDate!: Date;
  @Input() passengerData!: any;
  tickets: ITickets[] = [];

  constructor(
    private ticketService: TicketService,
    private ticketRegistrationService: TicketRegistrationService
  ) {
    // this.passengerData = {};
  }
  ngOnInit(): void {
    this.fetchTickets();
    this.submitRegistration();
  }

  fetchTickets() {
    // Use the ticket service to fetch tickets
    this.ticketService.getTickets().subscribe((tickets: ITickets[]) => {
      this.tickets = tickets;
    });
  }
  submitRegistration() {
    if (this.passengerData) {
      this.ticketRegistrationService
        .postTicketRegistration(this.passengerData)
        .subscribe(
          (response) => {
            console.log('Registration data submitted successfully:', response);
          },
          (error) => {
            console.error(
              'Error occurred while submitting registration data:',
              error
            );
          }
        );
    }
  }
  // Call the service method to submit registration data
}
