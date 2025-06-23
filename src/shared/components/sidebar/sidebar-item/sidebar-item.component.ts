import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, inject, Input, QueryList } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ChevronDown, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-sidebar-item',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css'
})

export class SidebarItemComponent implements AfterContentInit {
  @Input() icon?: any;
  @Input() label!: string;
  @Input() routerLink: any[] | string = [];
  @Input() collapsed: boolean = false;

  @ContentChildren(SidebarItemComponent)
  children!: QueryList<SidebarItemComponent>;

  private router = inject(Router);
  open = false;
  hasChildren = false;

  readonly ChevronDown = ChevronDown;
  readonly ChevronRight = ChevronRight;

  ngAfterContentInit() {
    this.hasChildren = this.children.length > 0;
    if (this.hasChildren && this.children.some(child => child.isActive)) {
      this.open = true;
    }
  }

  get isActive(): boolean {
    if (this.hasChildren) {
      return this.children.some(child => child.isActive);
    }
    return this.router.isActive(this.router.createUrlTree(Array.isArray(this.routerLink) ? this.routerLink : [this.routerLink]), {
      paths: 'exact',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }

  toggle() {
    this.open = !this.open;
  }
}
