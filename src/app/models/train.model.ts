import { IVagon } from './vagon.model';

export interface ITrains {
  id: number;
  number: number;
  name: string;
  date: string;
  from: string;
  to: string;
  departure: string;
  arrive: string;
  departureId: number;
  vagons: IVagon[];
}
