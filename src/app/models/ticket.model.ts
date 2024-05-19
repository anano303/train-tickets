export interface ITickets {
  id: string;
  phone: string;
  email: string;
  date: string;
  ticketPrice: number;
  trainID: number;
  confirmed: boolean;
  train: {
    id: number;
    number: number;
    name: string;
    date: string;
    from: string;
    to: string;
    departure: string;
    arrive: string;
    departureId: number;
    vagons: null;
  };
  persons: [
    {
      id: number;
      ticketId: string;
      seat: {
        seatId: string;
        number: string;
        price: number;
        isOccupied: boolean;
        vagonId: number;
      };
      name: string;
      surname: string;
      idNumber: string;
      status: null;
      payoutCompleted: boolean;
    }
  ];
}
