import { Component, Input } from '@angular/core';
import { ITrains } from '../../models/train.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selected-train',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-train.component.html',
  styleUrl: './selected-train.component.scss',
})
export class SelectedTrainComponent {
  @Input() selectedTrain: ITrains | null = null;
}
