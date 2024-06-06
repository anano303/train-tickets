import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITrains } from '../models/train.model';

@Injectable({
  providedIn: 'root',
})
export class TrainSelectionService {
  private selectedTrain: ITrains | null = null;
  private trainsDataSubject = new Subject<any>();
  trainsData$ = this.trainsDataSubject.asObservable();
  formattedDate: string = ''; // Add formatted date property

  // Set the selected train
  setSelectedTrain(train: ITrains): void {
    this.selectedTrain = train;
  }

  // Get the selected train
  getSelectedTrain(): ITrains | null {
    return this.selectedTrain;
  }

  // Set train data
  setTrainsData(data: any): void {
    this.trainsDataSubject.next(data);
  }

  // Set and format the date
  setFormattedDate(date: Date): void {
    this.formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
  }

  // Get formatted date
  getFormattedDate(): string {
    return this.formattedDate;
  }
}
