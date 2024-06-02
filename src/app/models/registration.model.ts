import { TicketRegistrationService } from '../services/ticket-registration.service';

export interface IRegistration {
  trainId: number;
  date: string;
  email: string;
  phoneNumber: string;
  people: [
    {
      seatId: string;
      name: string;
      surname: string;
      idNumber: string;
      status: string;
      payoutCompleted: boolean;
    }
  ];
}
