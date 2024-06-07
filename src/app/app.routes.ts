import { Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'trains',
        loadComponent: () =>
          import('./pages/find-trains/find-trains.component').then(
            (m) => m.FindTrainsComponent
          ),
      },
      {
        path: 'passenger-details',
        loadComponent: () =>
          import('./pages/passenger-details/passenger-details.component').then(
            (m) => m.PassengerDetailsComponent
          ),
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./pages/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
      },
      {
        path: '**',
        redirectTo: '/',
      },
    ],
  },
];
