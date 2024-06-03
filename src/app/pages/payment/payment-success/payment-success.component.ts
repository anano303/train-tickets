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
import { IRegistration } from '../../../models/registration.model';
import { Router } from '@angular/router';
import { SelectedTrainComponent } from '../../../shared/selected-train/selected-train.component';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [PaymentComponent, CommonModule, SelectedTrainComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent {
  @Input() paymentDate!: Date;
  @Input() passengerData!: any;
  selectedTrain: ITrains | null = null;
  tickets: ITickets[] = [];
  response: any;

  constructor(
    private ticketService: TicketService,
    private ticketRegistrationService: TicketRegistrationService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.response = state['response'];
      this.paymentDate = state['paymentDate'];
      this.passengerData = state['passengerData'];
      this.selectedTrain = state['selectedTrain'] || null; // selectedTrain might be undefined
    } else {
      // Handle case where navigation extras state is not provided
      console.error(
        'Navigation extras state is missing. Selected train cannot be determined.'
      );
      this.selectedTrain = null; // Initialize selectedTrain to null
    }
  }
  ngOnInit(): void {
    this.fetchTickets();
    this.submitRegistration();
    console.log('API Response:', this.response);
  }

  fetchTickets() {
    // Use the ticket service to fetch tickets
    this.ticketService.getTickets().subscribe((tickets: ITickets[]) => {
      this.tickets = tickets;
    });
  }
  submitRegistration() {
    // Check if selectedTrain and other data exist before making the call
    if (this.selectedTrain) {
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
            console.log('Registration data submitted successfully:', response);
          },
          (error) => {
            console.error(
              'Error occurred while submitting registration data:',
              error
            );
          }
        );
    } else {
      console.error('Selected train is missing. Cannot submit registration.');
    }
  }
}
