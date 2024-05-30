import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../translate.pipe';
import { ChangeLanguageComponent } from '../change-language/change-language.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TranslatePipe,
    ChangeLanguageComponent,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
  ],
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
