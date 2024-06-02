import { Routes } from '@angular/router';
import { FindTrainsComponent } from './pages/find-trains/find-trains.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component';
import { PaymentComponent } from './pages/payment/payment.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'trains', component: FindTrainsComponent },

      { path: 'passenger-details', component: PassengerDetailsComponent },
      { path: 'payment', component: PaymentComponent },

      // { path: '', redirectTo: '/payment', pathMatch: 'full' },
      { path: '**', redirectTo: '/' },
    ],
  },
];
