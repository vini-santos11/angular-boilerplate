import { ChevronLeft, ChevronRight, LucideAngularModule, Menu } from 'lucide-angular';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly ChevronRight = ChevronRight;
  readonly ChevronLeft = ChevronLeft;
  readonly Menu = Menu;

  collapsed = false;
  hoverExpanded = false;
  isMobile = false;
  isOpen = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
      window.addEventListener('resize', () => this.checkScreen());
    }
  }

  checkScreen() {
    this.isMobile = window.innerWidth < 768;
    this.isOpen = !this.isMobile;
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  handleToggleButton() {
    if (this.isMobile) {
      this.isOpen = false;
    } else {
      this.toggleCollapse();
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  get isCollapsed() {
    return this.collapsed && !this.hoverExpanded;
  }

  onMouseEnter() {
    if (this.collapsed) this.hoverExpanded = true;
  }

  onMouseLeave() {
    if (this.collapsed) this.hoverExpanded = false;
  }
}
