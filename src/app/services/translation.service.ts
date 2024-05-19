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
      WELCOMEH: 'Buy train tickets online',
      WELCOMEP: 'Wish you a happy journay',
    },

    ge: {
      RAILWAY: 'მატარებლის სადგური',
      WELCOMEH: 'შეიძინეთ მატარებლის ბილეთები ონლაინ',
      WELCOMEP: 'ბედნიერ მგზავრობას გისურვებთ!',
    },
  };

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.updateBodyClass();
  }

  translate(key: string): string {
    return this.translations[this.currentLang][key] || key;
  }
  private updateBodyClass() {
    const body = document.body;
    body.classList.remove('en', 'ge');
    body.classList.add(this.currentLang);
  }
}
