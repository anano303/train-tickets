import { Component, Input } from '@angular/core';
import { IStation } from '../../models/station.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StationService } from '../../services/station.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  @Input() stations: IStation[] = [];
  constructor(private router: Router) {}
  onSubmit() {
    console.log('reserved');
    this.router.navigate(['/trains']);
  }
}
