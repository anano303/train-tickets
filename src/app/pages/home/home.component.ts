import { Component } from '@angular/core';
import { ReservationComponent } from '../../components/reservation/reservation.component';
import { DecorationComponent } from '../../shared/decoration/decoration.component';
import { StationService } from '../../services/station.service';
import { IStation } from '../../models/station.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReservationComponent, DecorationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  stations: any = [];
  constructor(private stationService: StationService) {}
  ngOnInit(): void {}
  getStations(): void {
    this.stationService
      .getStations()
      .subscribe((stations) => (this.stations = stations));
  }
}
