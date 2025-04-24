import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  open = false;
  hasChildren = false;

  readonly ChevronDown = ChevronDown;
  readonly ChevronRight = ChevronRight;

  ngAfterContentInit() {
    this.hasChildren = this.children.length > 0;
  }

  toggle() {
    this.open = !this.open;
  }
}
