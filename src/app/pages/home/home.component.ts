import { Component } from '@angular/core';
import { ReservationComponent } from '../../components/reservation/reservation.component';
import { DecorationComponent } from '../../shared/decoration/decoration.component';
import { StationService } from '../../services/station.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../translate.pipe';
import { ChangeLanguageComponent } from '../../components/reservation/change-language/change-language.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReservationComponent,
    DecorationComponent,
    TranslatePipe,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  stations: any = [];

  constructor(
    private stationService: StationService,
    private translationService: TranslationService
  ) {}
  ngOnInit(): void {}
  getStations(): void {
    this.stationService
      .getStations()
      .subscribe((stations) => (this.stations = stations));
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }
}
