import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { DepartureService } from '../../services/departure.service';
import { IDepartures } from '../../models/departure.model';
import { CommonModule } from '@angular/common';
import { ITrains } from '../../models/train.model';
import { PassengerDetailsComponent } from '../../components/passenger-details/passenger-details.component';

@Component({
  selector: 'app-find-trains',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PassengerDetailsComponent],
  templateUrl: './find-trains.component.html',
  styleUrl: './find-trains.component.scss',
})
export class FindTrainsComponent {
  trains: ITrains[] = [];
  from: string = '';
  to: string = '';
  date: string = '';
  passengers: number = 1;

  constructor(
    private router: Router,
    private departureService: DepartureService
  ) {}

  ngOnInit(): void {
    this.fetchDepartures(this.from, this.to, this.date);
    // const navigation = this.router.getCurrentNavigation();
    // if (navigation && navigation.extras.state) {
    //   const state = navigation.extras.state as {
    //     from: string;
    //     to: string;
    //     date: string;
    //     passengers: number;
    //   };
    //   this.from = state.from;
    //   this.to = state.to;
    //   this.date = state.date;
    //   this.passengers = state.passengers;
    //   this.fetchDepartures(this.from, this.to, this.date);
    // }
  }

  fetchDepartures(from: string, to: string, date: string): void {
    this.departureService.getDepartures(from, to, date).subscribe(
      (data: IDepartures[]) => {
        this.trains = [];
        data.forEach((departure) => {
          this.trains.push(...departure.trains);
        });
      },
      (error) => {
        console.error('Error fetching departures', error);
      }
    );
  }

  bookTrain(train: ITrains): void {
    this.router.navigate(['/passenger-details'], {
      state: { train, passengers: this.passengers },
    });
  }
}
