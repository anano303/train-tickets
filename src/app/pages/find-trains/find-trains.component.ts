import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DepartureService } from '../../services/departure.service';
import { IDepartures } from '../../models/departure.model';
import { CommonModule } from '@angular/common';
import { ITrains } from '../../models/train.model';
import { PassengerDetailsComponent } from '../../components/passenger-details/passenger-details.component';
import { TrainSelectionService } from '../../shared/trainSelectionService.service';

@Component({
  selector: 'app-find-trains',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PassengerDetailsComponent],
  templateUrl: './find-trains.component.html',
  styleUrls: ['./find-trains.component.scss'],
})
export class FindTrainsComponent {
  trains: ITrains[] = [];
  from: string = '';
  to: string = '';
  date: string = '';
  passengers: number = 1;

  constructor(
    private router: Router,
    private departureService: DepartureService,
    private trainSelectionService: TrainSelectionService
  ) {
    const navigation = this.router.getCurrentNavigation()?.extras.state;
    if (navigation) {
      this.from = navigation['from'];
      this.to = navigation['to'];
      this.date = navigation['date'];
      this.passengers = navigation['passengers'];
      this.fetchDepartures(this.from, this.to, this.date);
    }
  }

  fetchDepartures(from: string, to: string, date: string): void {
    this.departureService.getDepartures(from, to, date).subscribe(
      (data: IDepartures[]) => {
        this.trains = [];
        data
          .filter(
            (departure) =>
              departure.source === from && departure.destination === to
          )
          .forEach((departure) => {
            this.trains.push(...departure.trains);
          });
      },
      (error) => {
        console.error('Error fetching departures', error);
      }
    );
  }

  bookTrain(train: ITrains): void {
    this.trainSelectionService.setSelectedTrain(train);
    this.router.navigate(['/passenger-details'], {
      state: { train, numberOfPassengers: this.passengers },
    });
  }
}
