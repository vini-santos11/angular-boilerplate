import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeClass = 'dark';
  currentTheme$ = new BehaviorSubject<'light' | 'dark'>('light');

  constructor() {
    this.loadTheme();
  }

  setDarkTheme() {
    const html = document.documentElement;
    html.classList.add(this.darkThemeClass);
    this.saveTheme('dark');
    this.currentTheme$.next('dark');
  }

  setLightTheme() {
    const html = document.documentElement;
    html.classList.remove(this.darkThemeClass);
    this.saveTheme('light');
    this.currentTheme$.next('light');
  }

  private saveTheme(theme: 'dark' | 'light') {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', theme);
    }
  }

  loadTheme() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const theme = localStorage.getItem('theme');
      const html = document.documentElement;
      if (theme === 'dark') {
        html.classList.add(this.darkThemeClass);
        this.currentTheme$.next('dark');
      } else {
        html.classList.remove(this.darkThemeClass);
        this.currentTheme$.next('light');
      }
    }
  }
}
