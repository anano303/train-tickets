import { Component, Input } from '@angular/core';
import { ITickets } from '../../../models/ticket.model';
import { PaymentComponent } from '../payment.component';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { ITrains } from '../../../models/train.model';
import { TicketRegistrationService } from '../../../services/ticket-registration.service';
import { IRegistration } from '../../../models/registration.model';
import { Router } from '@angular/router';
import { SelectedTrainComponent } from '../../../shared/selected-train/selected-train.component';
import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
import { TrainSelectionService } from '../../../shared/trainSelectionService.service';

declare var html2pdf: any;

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [PaymentComponent, CommonModule, SelectedTrainComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent {
  @Input() trains: ITrains[] = [];
  @Input() paymentDate!: Date;
  @Input() passengerData!: any;
  @Input() cardOwner!: string;
  @Input() totalPrice!: number;

  selectedTrain: ITrains | null = null;
  tickets: ITickets[] = [];
  response: any;
  numberOfPassengers: number = 1;
  selectedData: any;
  formattedDate: string = '';

  constructor(
    private ticketService: TicketService,
    private ticketRegistrationService: TicketRegistrationService,
    private router: Router,
    private trainSelectionService: TrainSelectionService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.selectedTrain = navigation.extras.state['selectedTrain'];
      this.response = state['response'];
      this.paymentDate = navigation.extras.state['passengerForm'];
      this.passengerData = navigation.extras.state['passengerData'];
      this.cardOwner = navigation.extras.state['cardOwner'];
      this.totalPrice = navigation.extras.state['totalPrice'];
      this.numberOfPassengers =
        navigation.extras.state['numberOfPassengers'] || 1;
      console.log('State:', state);
    }
  }
  ngOnInit(): void {
    this.selectedTrain = this.trainSelectionService.getSelectedTrain();
    this.formattedDate = this.trainSelectionService.getFormattedDate();
    console.log('Selected Train in Payment:', this.selectedTrain);
    console.log('Passenger Data:', this.passengerData);
    console.log('Tickets:', this.tickets);
    console.log('Payment Date:', this.paymentDate);
    console.log('Card Owner:', this.cardOwner);
    console.log('Total Price:', this.totalPrice);
    this.fetchTickets();
    this.submitRegistration();
    console.log('API Response:', this.response);
  }

  fetchTickets() {
    this.ticketService.getTickets().subscribe((tickets: ITickets[]) => {
      this.tickets = tickets;
      console.log(tickets);
    });
  }
  submitRegistration() {
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
  cancelTicket(ticketId: string): void {
    this.ticketService.cancelTicket(ticketId).subscribe(
      (response) => {
        console.log('Ticket cancelled successfully:', response);
        alert('Ticket cancelled successfully.');
      },
      (error) => {
        console.error('Error cancelling ticket:', error);
        alert('Error cancelling ticket. Please try again.');
      }
    );
  }

  downloadPDF() {
    const element = document.querySelector('.pdf') as HTMLElement;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('downloaded-pdf.pdf');
    });
  }

  printPage() {
    window.print();
  }
}
