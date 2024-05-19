export interface IDepartures {
  id: number;
  source: string;
  destination: string;
  date: string;
  trains: [
    {
      id: number;
      number: number;
      name: string;
      date: string;
      from: string;
      to: string;
      departure: string;
      arrive: string;
      departureId: number;
      vagons: [
        {
          id: number;
          trainId: number;
          trainNumber: number;
          name: string;
          seats: [
            {
              seatId: string;
              number: string;
              price: number;
              isOccupied: boolean;
              vagonId: number;
            }
          ];
        }
      ];
    }
  ];
}
