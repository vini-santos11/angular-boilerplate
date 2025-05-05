import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, Menu } from 'lucide-angular';

@Component({
  selector: 'app-logged-header',
  imports: [LucideAngularModule],
  templateUrl: './logged-header.component.html',
  styleUrl: './logged-header.component.css'
})
export class LoggedHeaderComponent {
  @Output() clicked = new EventEmitter<void>();

  readonly Menu = Menu;

  handleClick() {
    this.clicked.emit();
  }
}
