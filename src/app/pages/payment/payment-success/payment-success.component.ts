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
import jsPDF from 'jspdf';
import { materialize } from 'rxjs';
import { Html2CanvasOptions } from 'jspdf';

import html2canvas from 'html2canvas';

declare var html2pdf: any;

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
  @Input() cardOwner!: string;
  @Input() totalPrice!: number;
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
      this.cardOwner = state['cardOwner']; // Retrieve cardOwner from navigation state
      this.totalPrice = state['totalPrice'];
    } else {
      console.log('Total Price:', this.totalPrice);
      console.log('Card Owner:', this.cardOwner);
      // Handle case where navigation extras state is not provided
      console.error('Navigation extras state is missing');
      this.selectedTrain = null; // Initialize selectedTrain to null
    }
  }
  ngOnInit(): void {
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
