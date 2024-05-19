import { Component } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss',
})
export class ChangeLanguageComponent {

  constructor(private translationService: TranslationService) {}
  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);

    console.log('click');
  }
}
