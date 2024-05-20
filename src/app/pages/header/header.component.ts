import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../translate.pipe';
import { ChangeLanguageComponent } from '../../components/change-language/change-language.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe, ChangeLanguageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private translationService: TranslationService) {}

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  resetLocalStorage() {
    // localStorage.setItem('gio', "g")
    localStorage.clear();
  }
}
