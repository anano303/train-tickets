import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss',
})
export class ChangeLanguageComponent {
  currentLang: string;
  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.getCurrentLang(); // Initialize with current language
  }
  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.currentLang = lang;
    console.log('Language changed to:', lang);
  }
}
