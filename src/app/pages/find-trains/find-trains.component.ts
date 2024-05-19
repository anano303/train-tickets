import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-find-trains',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './find-trains.component.html',
  styleUrl: './find-trains.component.scss',
})
export class FindTrainsComponent {}
