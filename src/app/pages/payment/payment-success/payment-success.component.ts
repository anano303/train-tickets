import { Component, Input } from '@angular/core';
import { ITickets } from '../../../models/ticket.model';
import { PaymentComponent } from '../payment.component';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { ITrains } from '../../../models/train.model';
import { TicketRegistrationService } from '../../../services/ticket-registration.service';
import { IRegistration } from '../../../models/registration.model';
import { NavigationExtras, Router } from '@angular/router';
import { SelectedTrainComponent } from '../../../shared/selected-train/selected-train.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TrainSelectionService } from '../../../shared/trainSelectionService.service';
import { SharedDataService } from '../../../shared/sharedDataService.service';

declare var html2pdf: any;

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [PaymentComponent, CommonModule, SelectedTrainComponent],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent {
  @Input() trains: ITrains[] = [];
  @Input() paymentDate!: Date;
  @Input() passengerData!: any;
  @Input() cardOwner!: string;
  @Input() totalPrice!: number;
  @Input() tickets: ITickets[] = [];
  @Input() paymentSuccessData: any;

  selectedTrain: ITrains | null = null;
  response: any;
  numberOfPassengers: number = 1;
  formattedDate: string = '';
  vagonId: string | null = null;
  ticketId: string | null = null;

  constructor(
    private ticketService: TicketService,
    private ticketRegistrationService: TicketRegistrationService,
    private router: Router,
    private trainSelectionService: TrainSelectionService,
    private sharedDataService: SharedDataService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };

      this.ticketId = state['ticketId'] || null;
      this.vagonId = state['vagonId'] || null;
      this.selectedTrain = state['selectedTrain'];
      this.response = state['response'];
      this.paymentDate = state['paymentDate'];
      this.passengerData = state['passengerData'];
      this.cardOwner = state['cardOwner'];
      this.totalPrice = state['totalPrice'];
      this.numberOfPassengers = state['numberOfPassengers'] || 1;
      console.log('State:', state);
    }

    this.selectedTrain = this.trainSelectionService.getSelectedTrain();
    this.formattedDate = this.trainSelectionService.getFormattedDate();

    this.fetchTickets();
  }

  ngOnInit(): void {}

  fetchTickets() {
    this.ticketService.getTickets().subscribe((tickets: ITickets[]) => {
      this.tickets = tickets;
      if (this.tickets.length > 0) {
        this.ticketId = this.tickets[0].persons[0].ticketId;
        this.submitRegistration(this.ticketId);
      }
    });
  }

  submitRegistration(ticketId: string) {
    this.sharedDataService.paymentSuccessData = {
      selectedTrain: this.selectedTrain,
      paymentDate: this.paymentDate,
      passengerData: this.passengerData,
      cardOwner: this.cardOwner,
      totalPrice: this.totalPrice,
      tickets: this.tickets,
      email: this.passengerData.email,
      phoneNumber: this.passengerData.phone,
      people: this.passengerData.passengers,
      ticketId: ticketId,
    };
    if (this.selectedTrain) {
      const registrationData: IRegistration = {
        trainId: this.selectedTrain.id,
        ticketId: ticketId,
        date: new Date().toISOString(),
        email: this.passengerData.email,
        phoneNumber: this.passengerData.phone,
        people: this.passengerData.passengers,
      };
      console.log('tocket id', ticketId),
        this.ticketRegistrationService
          .postTicketRegistration(registrationData)
          .subscribe(
            (response) => {
              console.log(
                'Registration data submitted successfully:',
                response
              );
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
        const navigationExtras: NavigationExtras = {
          state: {
            response: response,
          },
        };
        this.router.navigate(['/cancel-ticket'], navigationExtras);
      },
      (error) => {
        console.error('Error cancelling ticket:', error);
        console.log('Error Details:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          headers: error.headers,
          message: error.message,
          name: error.name,
          ok: error.ok,
        });
        alert('Error cancelling ticket. Please try again.');
      }
    );
  }

  downloadPDF() {
    const element = document.querySelector('.pdf') as HTMLElement;

    if (!element) {
      console.error('Element not found');
      return;
    }

    html2canvas(element)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save('downloaded-pdf.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  }

  printPage() {
    window.print();
  }
}
