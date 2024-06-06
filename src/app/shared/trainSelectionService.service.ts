import { Injectable } from '@angular/core';
import { ITrains } from '../models/train.model';

@Injectable({
  providedIn: 'root',
})
export class TrainSelectionService {
  private selectedTrain: ITrains | null = null;

  setSelectedTrain(train: ITrains): void {
    this.selectedTrain = train;
  }

  getSelectedTrain(): ITrains | null {
    return this.selectedTrain;
  }
}
