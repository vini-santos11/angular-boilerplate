import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { LogOut, LucideAngularModule, Menu } from 'lucide-angular';
import { LanguageService } from '../../../app/services/language.service';

@Component({
  selector: 'app-logged-header',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './logged-header.component.html',
  styleUrl: './logged-header.component.css'
})
export class LoggedHeaderComponent {
  @Output() clicked = new EventEmitter<void>();
  image: string = 'assets/images/bluelogo.png';
  showProfileMenu = false;

  readonly Menu = Menu;
  readonly LogOut = LogOut;

  private languageService = inject(LanguageService);
  langs = this.languageService.langs;

  constructor(private eRef: ElementRef) { }

  handleClick() {
    this.clicked.emit();
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    this.showProfileMenu = false;
  }

  setLang(lang: string) {
    this.languageService.changeLanguage(lang);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showProfileMenu = false;
    }
  }
}
