import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  private availableLangs = ['en', 'pt'];
  private defaultLang = 'pt';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (!this.isBrowser) return;

    const savedLang = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();

    const langToUse =
      savedLang && this.availableLangs.includes(savedLang)
        ? savedLang
        : this.availableLangs.includes(browserLang || '')
        ? browserLang
        : this.defaultLang;

    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(langToUse || this.defaultLang);
  }

  changeLanguage(lang: string) {
    if (this.availableLangs.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem('lang', lang);
    }
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  get langs() {
    return this.availableLangs;
  }
}