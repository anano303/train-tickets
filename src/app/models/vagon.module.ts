export interface IVagons {
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
