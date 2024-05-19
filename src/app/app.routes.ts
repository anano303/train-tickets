import { Routes } from '@angular/router';
import { FindTrainsComponent } from './pages/find-trains/find-trains.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'trains', component: FindTrainsComponent },
];
