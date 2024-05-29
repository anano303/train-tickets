import { ISeat } from './seats.model';

export interface IVagon {
  id: number;
  trainId: number;
  trainNumber: number;
  name: string;
  seats: ISeat[];
}
