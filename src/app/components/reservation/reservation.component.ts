import { Component, Input } from '@angular/core';
import { IStation } from '../../models/station.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  onSubmit() {
    console.log('reserved');
  }

  @Input() stations: IStation[] = [];
}
