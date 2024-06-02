import { Injectable } from '@angular/core';
import { ITrains } from '../models/train.model';

@Injectable({
  providedIn: 'root',
})
export class TrainSelectionService {
  private selectedTrain: ITrains | undefined;

  setSelectedTrain(train: ITrains): void {
    this.selectedTrain = train;
  }

  getSelectedTrain(): ITrains | undefined {
    return this.selectedTrain;
  }
}
