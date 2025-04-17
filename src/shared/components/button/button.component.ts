import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() text : string | undefined;
  @Input() color : 'primary' | 'secondary' = 'primary';
  @Input() size : 'small' | 'medium' | 'large' | 'full' = 'medium';
  @Input() variant : 'filled' | 'outlined' | 'icon' = 'filled';
  @Input() icon?: any;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() type : 'button' | 'submit' | 'reset' = 'button';

  get buttonStyle(): string {
    switch (this.variant) {
      case 'filled':
        switch (this.color) {
          case 'primary':
            return 'bg-primary text-white hover:bg-primary-dark';
          case 'secondary':
            return 'bg-secondary text-white hover:bg-secondary-dark';
        }
        break;

      case 'outlined':
        switch (this.color) {
          case 'primary':
            return 'bg-transparent border border-primary text-primary hover:bg-primary-light text-black';
          case 'secondary':
            return 'bg-transparent border border-secondary text-secondary hover:bg-secondary-light text-black';
        }
        break;

      case 'icon':
        switch (this.color) {
          case 'primary':
            return 'bg-transparent hover:cursor-pointer hover:text-primary text-gray-300';
          case 'secondary':
            return 'bg-transparent hover:cursor-pointer hover:text-secondary text-gray-300';
        }
        break;
    }
    return 'bg-primary text-white hover:bg-primary-dark';
  }

  get buttonSize() : string {
    switch (this.size) {
      case 'small':
        return 'px-2 py-1 text-sm ';
      case 'medium':
        return 'px-4 py-2 text-base ';
      case 'large':
        return 'px-6 py-3 text-lg ';
      case 'full':
        return 'w-full px-4 py-2 text-lg ';
      default:
        return 'px-4 py-2 text-base ';
    }
  }
}


