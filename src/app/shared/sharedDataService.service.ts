import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  paymentSuccessData: any = {
    selectedTrain: null,
    paymentDate: new Date(),
    passengerData: { email: '', phone: '', passengers: [] },
    cardOwner: '',
    totalPrice: 0,
    tickets: [],
  };

  setPaymentSuccessData(data: any) {
    this.paymentSuccessData = data;
  }

  getPaymentSuccessData() {
    return this.paymentSuccessData;
  }
  constructor() {}
}
