import { Routes } from '@angular/router';
import { FindTrainsComponent } from './pages/find-trains/find-trains.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './components/layouts/layouts.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'trains', component: FindTrainsComponent },
      { path: '**', redirectTo: '/' },
    ],
  },
];
