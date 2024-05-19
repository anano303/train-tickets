import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor() {}
  private currentLang: string = 'en';
  private translations: any = {
    en: {
      RAILWAY: 'TrainRailway',
    },
    ge: {
      RAILWAY: 'მატარებლის სადგური',
    },
  };

  setLanguage(lang: string) {
    this.currentLang = lang;
  }

  translate(key: string): string {
    return this.translations[this.currentLang][key] || key;
  }
}
