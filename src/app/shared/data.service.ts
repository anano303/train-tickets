import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private passengerData: any;
  private selectedTrain: any;
  private totalPrice!: number;

  setPassengerData(data: any) {
    this.passengerData = data;
  }

  getPassengerData() {
    return this.passengerData;
  }

  setSelectedTrain(train: any) {
    this.selectedTrain = train;
  }

  getSelectedTrain() {
    return this.selectedTrain;
  }

  setTotalPrice(price: number) {
    this.totalPrice = price;
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}
