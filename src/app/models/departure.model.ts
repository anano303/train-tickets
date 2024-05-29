import { ITrains } from './train.model';

export interface IDepartures {
  id: number;
  source: string;
  destination: string;
  date: string;
  trains: ITrains[];
}
