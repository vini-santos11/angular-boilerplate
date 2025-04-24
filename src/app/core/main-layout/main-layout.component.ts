import { Home, LucideAngularModule, Menu, Settings, UserPen } from 'lucide-angular';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { SidebarItemComponent } from '../../../shared/components/sidebar/sidebar-item/sidebar-item.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, SidebarItemComponent, RouterOutlet, LucideAngularModule, CommonModule, TranslatePipe],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  readonly Home = Home;
  readonly Settings = Settings;
  readonly UserPen = UserPen;
  readonly Menu = Menu;
}
